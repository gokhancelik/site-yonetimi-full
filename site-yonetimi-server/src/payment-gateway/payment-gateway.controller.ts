import { Controller, Post, Body, ValidationPipe, Res, Param, HttpService, UseGuards, Get, Req } from '@nestjs/common';
import { TahsilatService } from '../tahsilat/tahsilat.service';
import { AuthGuard } from '@nestjs/passport';
import { Kisi } from '../kisi/kisi.entity';
import CryptoJS = require('crypto-js');
import { map } from 'rxjs/operators';
import { Response, Request } from 'express'
import { TahsilatDurumu } from '../tahsilat/tahsilat.entity';
import { OdemeIslemleriService } from '../odeme-islemleri/odeme-islemleri.service';
@Controller('payment-gateway')
export class PaymentGatewayController {
    constructor(private readonly httpService: HttpService,
        private tahsilatService: TahsilatService,
        private odemeIslemleriService: OdemeIslemleriService) {
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('config/:tahsilatId')
    async config(@Param('tahsilatId') tahsilatId: string, @Req() req): Promise<any> {
        let tahsilat = await this.tahsilatService.findById(tahsilatId);
        let kisi = await Kisi.findOne(tahsilat.meskenKisi.kisiId);
        let buff = new Buffer(JSON.stringify(tahsilat.tahsilatKalems.map(s => { return [s.odemeTipi.ad + ' Tahsilatı', s.tutar.toString(), 1] })));
        let base64data = buff.toString('base64');
        let body = {
            merchant_id: tahsilat.sanalPos.ayarlarParsed.merchant_id,
            user_ip: req.ip,
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
            user_address: kisi.adres,
            user_phone: kisi.cepTelefon,
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
        return this.httpService.post('https://www.paytr.com/odeme/api/get-token', data,
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).pipe(map(d => {
                return d.data;
            })).toPromise();
    }
    @Post('callback/:kod')
    async callback(@Param('kod') kod: string, @Req() req: Request, @Res() res: Response): Promise<any> {
        let body: {
            hash: string,//'HkdVU3CFseBTAA+0dY3JPD8FQDlywuh++xmq2dRMY0U=',
            merchant_oid: string,//'640EF3232CCDEA1180E3E1BEBD890235',
            status: string,//'success',
            total_amount: number,//'22113',
            payment_type: string,//'card',
            payment_amount: number,//'22113',
            currency: string,//'TL',
            installment_count: string,// '1',
            merchant_id: string,// '164697',
            test_mode: string,// '1'
        } = req.body;
        let tahsilat = await this.tahsilatService.findByTahsilatNo(body.merchant_oid);
        let concatStr: string = `${body.merchant_oid}${tahsilat.sanalPos.ayarlarParsed.merchant_salt}${body.status}${body.total_amount}`;
        let sha = CryptoJS.HmacSHA256(concatStr, tahsilat.sanalPos.ayarlarParsed.merchant_key);
        let token = sha.toString(CryptoJS.enc.Base64);
        if (body.hash != token) {
            res.send("PAYTR notification failed: bad hash");
            return;
        }
        if (body.status === 'success') {
            this.odemeIslemleriService.tahsilatiOnayla(tahsilat.id, tahsilat.sanalPos.hesapId);
        } else {

        }
        this.odemeIslemleriService.sanalPosLogEkle(tahsilat.id, JSON.stringify(body), body.status === 'success');
        res.send('OK');
        return;
    }
}
