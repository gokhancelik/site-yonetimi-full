import { Injectable, HttpException, HttpService } from '@nestjs/common';
import { BrandName, KuveytTurkVPosMessage, Currency, VPosTransactionResponseContract } from './kuveyt-turk-vpos-message';
import { map, catchError } from 'rxjs/operators';
import * as xml2js from 'xml2js';
import { of } from 'rxjs';
import { TransactionType } from './transaction-type-enum';
import { TahsilatService } from '../../../tahsilat/tahsilat.service';
import { Tahsilat } from '../../../tahsilat/tahsilat.entity';
import { SanalPosOdemeSonucuModel } from '../../sanal-pos-odeme-sonucu.model';
import { TahsilatSanalPosLog } from '../../../tahsilat/tahsilat-sanal-pos-log.entity';
import { SanalPosService } from '../../sanal-pos.service';
import { SanalPos } from '../../sanal-pos.entity';
import { OdemeIslemleriService } from '../../../odeme-islemleri/odeme-islemleri.service';

@Injectable()
export class KuveytTurkSanalPosService {
    sanalPosAyarlari: SanalPos;
    /**
    *
    */
    constructor(private readonly httpService: HttpService,
        private readonly sanalPosService: SanalPosService,
        private readonly odemeIslemleriService: OdemeIslemleriService,
        private tahsilatService: TahsilatService) {
    }

    async error(model: any): Promise<TahsilatSanalPosLog> {
        let enrollmentResult = await xml2js.parseStringPromise(decodeURIComponent(model.AuthenticationResponse).replace(/\+/g, ' '), { explicitArray: false, explicitRoot: false, tagNameProcessors: [this.camelCase] });
        // const sonuc: { sonuc?: boolean, kod?: string, mesaj?: string } = {
        //     sonuc: enrollmentResult.responseCode === '00',
        //     kod: enrollmentResult.responseCode,
        //     mesaj: enrollmentResult.responseMessage,
        // };
        return await this.odemeIslemleriService.sanalPosLogEkle(enrollmentResult.merchantOrderId, JSON.stringify(enrollmentResult), false);
    }
    private camelCase(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index == 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    }
    async provision(model: any): Promise<TahsilatSanalPosLog> {
        this.sanalPosAyarlari = await this.sanalPosService.getByKod('kuveyt-turk-sanal-pos');
        let enrollmentResult = await xml2js.parseStringPromise(decodeURIComponent(model.AuthenticationResponse).replace(/\+/g, ' '), { explicitArray: false, explicitRoot: false, tagNameProcessors: [this.camelCase], });
        //const UserName = 'apitest'; //  api rollü kullanici adı
        //const Password = 'api123'; //  api rollü kullanici sifresi
        //const CustomerId = '400235'; // Müsteri Numarasi
        let server = this.sanalPosAyarlari.ayarlarParsed.server; //'https://boatest.kuveytturk.com.tr/boa.virtualpos.services/Home/ThreeDModelProvisionGate';
        let provision = new KuveytTurkVPosMessage(
            enrollmentResult.vPosMessage.amount,
            this.sanalPosAyarlari.ayarlarParsed.customerId,
            null,
            enrollmentResult.vPosMessage.cardNumber,
            null,
            null,
            null,
            null,
            enrollmentResult.vPosMessage.currencyCode,
            enrollmentResult.vPosMessage.okUrl,
            enrollmentResult.vPosMessage.failUrl,
            enrollmentResult.vPosMessage.merchantId,
            enrollmentResult.vPosMessage.merchantOrderId,
            this.sanalPosAyarlari.ayarlarParsed.userName,
            this.sanalPosAyarlari.ayarlarParsed.password,
            server,
            TransactionType.Sale,
            0
        );
        try {

            provision.additionalData = {
                data: enrollmentResult.mD,
                key: 'MD'
            };
            const sonuc: { sonuc?: boolean, kod?: string, mesaj?: string } = {
                sonuc: enrollmentResult.responseCode === '00',
                kod: enrollmentResult.responseCode,
                mesaj: enrollmentResult.responseMessage,
            };
            if (sonuc.sonuc) {
                return await this.httpService.post(provision.serviceUrl, provision.toXML(), {
                    headers: {
                        'Content-Type': 'application/xml',
                    }
                }).pipe(map(async (d) => {
                    const paymentResult: VPosTransactionResponseContract = await xml2js.parseStringPromise(decodeURIComponent(d.data).replace(/\+/g, ' '), { explicitArray: false, explicitRoot: false, tagNameProcessors: [this.camelCase] });
                    let sonuc = false;
                    if (paymentResult.responseCode === '00') {
                        let tahsilat = await this.odemeIslemleriService.tahsilatOnayla(paymentResult.merchantOrderId, paymentResult.orderId, this.sanalPosAyarlari.hesapId);
                        sonuc = true;
                    } else {
                        await this.tahsilatService.delete(paymentResult.orderId);
                        sonuc = false;
                    }
                    return await this.odemeIslemleriService.sanalPosLogEkle(paymentResult.merchantOrderId, JSON.stringify(paymentResult), sonuc);
                })).toPromise();
            }
        } catch (e) {
            return await this.odemeIslemleriService.sanalPosLogEkle(enrollmentResult.merchantOrderId, JSON.stringify({ responseMessage: 'Banka Tarafında beklenmeyen bir hata oluştu. Ödeme kredi kartınızdan çekildiyse site yöneticisi ile irtibata geçiniz.', error: e }), false);
        }
    }

    async enrollment(tutar: number, creditCard: any, tahsilatId: string): Promise<any> {
        this.sanalPosAyarlari = await this.sanalPosService.getByKod('kuveyt-turk-sanal-pos');
        //const CustomerId = '400235'; // Müsteri Numarasi
        //const MerchantId = '496'; // Magaza Kodu
        //const OkUrl = 'http://localhost:4000/online-islemler/odeme-basarili'; // Basarili sonuç alinirsa, yönledirelecek sayfa
        //const FailUrl = 'http://localhost:4000/online-islemler/odeme-hatali'; // Basarisiz sonuç alinirsa, yönledirelecek sayfa
        //const UserName = 'apitest'; //  api rollü kullanici adı
        //const Password = 'api123'; //  api rollü kullanici sifresi
        //const gServer = 'https://boatest.kuveytturk.com.tr/boa.virtualpos.services/Home/ThreeDModelPayGate';
        const payment = new KuveytTurkVPosMessage(
            Number(tutar).toLocaleString('tr-TR', { maximumFractionDigits: 2 }).replace('.', '').replace(',', ''),
            this.sanalPosAyarlari.ayarlarParsed.customerId,
            creditCard.cardHolderName,
            creditCard.cardNumber,
            creditCard.brandName ? creditCard.brandName : BrandName.MasterCard,
            creditCard.cardCVV2,
            creditCard.cardExpireDateMonth,
            creditCard.cardExpireDateYear.toString().substring(2),
            Currency.TRL,
            this.sanalPosAyarlari.ayarlarParsed.okUrl,
            this.sanalPosAyarlari.ayarlarParsed.failUrl,
            this.sanalPosAyarlari.ayarlarParsed.merchantId,
            tahsilatId,
            this.sanalPosAyarlari.ayarlarParsed.userName,
            this.sanalPosAyarlari.ayarlarParsed.password,
            this.sanalPosAyarlari.ayarlarParsed.gServer,
            TransactionType.Sale,
            0
        );
        return await this.httpService.post(payment.serviceUrl, payment.toXML(), {
            headers: {
                'Content-Type': 'application/xml',
            }
        }).pipe(map(d => {
            return { htmlResponse: d.data };
        })).pipe(catchError(e => {
            throw new HttpException(e.response.data, e.response.status);
        })).toPromise();
    }

}
