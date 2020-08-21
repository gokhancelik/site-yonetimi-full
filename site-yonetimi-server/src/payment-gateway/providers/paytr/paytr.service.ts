import { Injectable, Logger, HttpService } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TahsilatService } from '../../../tahsilat/tahsilat.service';
import { PaytrTransactionDTO } from './paytr-transaction.dto';
import CryptoJS = require('crypto-js');
import { PaytrTransactionResultDTO } from './paytr-transaction-result.dto';
import { Response } from 'express';
import { OdemeIslemleriService } from '../../../odeme-islemleri/odeme-islemleri.service';
import { Kisi } from '../../../kisi/kisi.entity';
import { map } from 'rxjs/operators';
import { PaytrTransferDTO } from './paytr-transfer.dto';
import { TahsilatSanalPosLog } from '../../../tahsilat/tahsilat-sanal-pos-log.entity';
import { LessThan, IsNull } from 'typeorm';
import { SanalPos } from '../../../sanal-pos/sanal-pos.entity';
import { HesapTanimi } from '../../../hesap-tanimi/hesap-tanimi.entity';

@Injectable()
export class PaytrService {


    constructor(private tahsilatService: TahsilatService,
        private readonly httpService: HttpService,
        private odemeIslemleriService: OdemeIslemleriService) {

    }
    async provision(tahsilatId: string, ip: string) {
        let tahsilat = await this.tahsilatService.findById(tahsilatId);
        let kisi = await Kisi.findOne(tahsilat.meskenKisi.kisiId);
        let buff = new Buffer(JSON.stringify(tahsilat.tahsilatKalems.map(s => { return [s.odemeTipi.ad + ' Tahsilatı', s.tutar.toString(), 1] })));
        let base64data = buff.toString('base64');
        let body = {
            merchant_id: tahsilat.sanalPos.ayarlarParsed.merchant_id,
            user_ip: ip,
            merchant_oid: tahsilat.tahsilatNo,
            email: kisi.eposta || 'cigdemadasi@turkuazvadisi.com',
            payment_amount: Math.round(tahsilat.tutar * 100),
            user_basket: base64data,
            paytr_token: '',
            no_installment: tahsilat.sanalPos.ayarlarParsed.no_installment || '0',
            max_installment: tahsilat.sanalPos.ayarlarParsed.max_installment || '0',
            currency: 'TL',
            debug_on: tahsilat.sanalPos.ayarlarParsed.debug_on || '1',
            test_mode: tahsilat.sanalPos.ayarlarParsed.test_mode || '1',
            user_name: kisi.tamAd,
            user_address: kisi.adres || 'ADRES YOK',
            user_phone: kisi.cepTelefon || kisi.telefon || '0000000000',
            merchant_ok_url: tahsilat.sanalPos.ayarlarParsed.ok_url || 'https://cigdemadasi.turkuazvadisi.com/online-islemler/odeme-basarili',
            merchant_fail_url: tahsilat.sanalPos.ayarlarParsed.fail_url || 'https://cigdemadasi.turkuazvadisi.com/online-islemler/odeme-hatali',
            lang: '',
            timeout_limit: '30'
        }
        let concatStr: string = `${body.merchant_id}${body.user_ip}${body.merchant_oid}${body.email}${body.payment_amount}${base64data}${body.no_installment}${body.max_installment}${body.currency}${body.test_mode}${tahsilat.sanalPos.ayarlarParsed.merchant_salt}`;
        let sha = CryptoJS.HmacSHA256(concatStr, tahsilat.sanalPos.ayarlarParsed.merchant_key);
        body.paytr_token = sha.toString(CryptoJS.enc.Base64);
        const data = Object.entries(body)
            .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
            .join('&');
        return this.httpService.post('https://www.paytr.com/odeme/api/get-token', data, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).pipe(map(d => {
            return d.data;
        })).toPromise();
    }
    private readonly logger = new Logger(PaytrService.name);
    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async transfer() {
        let bugun = new Date();
        bugun.setHours(0, 0, 0, 0);
        let tahsilatlar = await TahsilatSanalPosLog.find({
            where: {
                aktarildiMi: false,
                durum: true,
                olusturmaTarihi: LessThan(bugun),
                transactionId: IsNull()
            }
        });
        for (const tahsilatLog of tahsilatlar) {
            let hesap = tahsilatLog.tahsilat.sanalPos.hesap;
            let transfer: PaytrTransferDTO = {
                merchant_id: tahsilatLog.tahsilat.sanalPos.ayarlarParsed.merchant_id,
                merchant_key: tahsilatLog.tahsilat.sanalPos.ayarlarParsed.merchant_key,
                merchant_salt: tahsilatLog.tahsilat.sanalPos.ayarlarParsed.merchant_salt,
                merchant_oid: tahsilatLog.tahsilat.tahsilatNo.toString(),
                submerchant_amount: 0,
                trans_id: tahsilatLog.id.split('-').join(''),
                total_amount: Math.round(tahsilatLog.tahsilat.tutar * 100),
                paytr_token: '',
                transfer_name: hesap.hesapAdi,
                transfer_iban: hesap.iban.split(' ').join('')
            };
            let concatStr: string = `${transfer.merchant_id}${transfer.merchant_oid}${transfer.trans_id}${transfer.submerchant_amount.toString()}${transfer.total_amount.toString()}${transfer.transfer_name}${transfer.transfer_iban}${transfer.merchant_salt}`;
            let sha = CryptoJS.HmacSHA256(concatStr, transfer.merchant_key);
            transfer.paytr_token = sha.toString(CryptoJS.enc.Base64);
            const data = Object.entries(transfer)
            .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
            .join('&');
            this.httpService.post('https://www.paytr.com/odeme/platform/transfer', data,
                {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .subscribe(res => {
                    if (res.data.status === 'success') {
                        tahsilatLog.transactionId = transfer.trans_id;
                        tahsilatLog.save();
                    }
                });
        }

    }
    async transaction(dto: PaytrTransactionDTO, res: Response): Promise<PaytrTransactionResultDTO> {
        let result: PaytrTransactionResultDTO = { success: false, message: '' };
        let tahsilat = await this.tahsilatService.findByTahsilatNo(dto.merchant_oid);
        if(!tahsilat){
            res.send("PAYTR notification failed: tahsilat bulunamadı");
            return;
        }
        let concatStr: string = `${dto.merchant_oid}${tahsilat.sanalPos.ayarlarParsed.merchant_salt}${dto.status}${dto.total_amount}`;
        let sha = CryptoJS.HmacSHA256(concatStr, tahsilat.sanalPos.ayarlarParsed.merchant_key);
        let token = sha.toString(CryptoJS.enc.Base64);
        if (dto.hash != token) {
            res.send("PAYTR notification failed: bad hash");
            return result;
        }
        if (dto.status === 'success') {
            result.success = true;
            await this.odemeIslemleriService.tahsilatiOnayla(tahsilat.id, tahsilat.sanalPos.hesapId, false);
        } else {
            result.success = false;
            result.message = dto.failed_reason_msg
        }
        await this.odemeIslemleriService.sanalPosLogEkle(tahsilat.id, JSON.stringify(dto), dto.status === 'success');
        res.send('OK');
        return result;
    }
    async transferResult(body: any, res: Response<any>): Promise<any> {
        let sanalPos = await SanalPos.findOne({
            where: {
                kod: 'paytr',
                aktifMi: true
            }
        });

        let trans_ids: string[] = JSON.parse(body.trans_ids);
        let hash = body.hash;
        this.logger.debug(trans_ids);
        let concatStr: string = `${trans_ids.join('')}${sanalPos.ayarlarParsed.merchant_salt}`;
        let sha = CryptoJS.HmacSHA256(concatStr, sanalPos.ayarlarParsed.merchant_key);
        let token = sha.toString(CryptoJS.enc.Base64);
        if (token !== hash) {
            res.send("PAYTR notification failed: bad hash");
            return null;
        }
        for (const trans of trans_ids) {
            let transfer = await TahsilatSanalPosLog.findOne({
                where: {

                    transactionId: trans
                }
            });
            transfer.aktarildiMi = true;
            transfer.save();
        }
    }
}
