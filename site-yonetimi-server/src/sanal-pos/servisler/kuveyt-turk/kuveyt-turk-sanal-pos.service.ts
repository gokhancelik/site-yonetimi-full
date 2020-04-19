import { Injectable, HttpException, HttpService } from '@nestjs/common';
import { BrandName, KuveytTurkVPosMessage, Currency, VPosTransactionResponseContract } from './kuveyt-turk-vpos-message';
import { map, catchError } from 'rxjs/operators';
import * as xml2js from 'xml2js';
import { of } from 'rxjs';
import { TransactionType } from './transaction-type-enum';

@Injectable()
export class KuveytTurkSanalPosService {
    /**
    *
    */
    constructor(private readonly httpService: HttpService) {
    }

    async error(model: any): Promise<any> {
        let enrollmentResult = await xml2js.parseStringPromise(decodeURIComponent(model.AuthenticationResponse).replace(/\+/g, ' '), { explicitArray: false, explicitRoot: false, tagNameProcessors: [this.camelCase] });
        const sonuc: { sonuc?: boolean, kod?: string, mesaj?: string } = {
            sonuc: enrollmentResult.responseCode === '00',
            kod: enrollmentResult.responseCode,
            mesaj: enrollmentResult.responseMessage,
        };
        return of(sonuc).toPromise();
    }
    private camelCase(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index == 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    }
    async provision(model: any): Promise<VPosTransactionResponseContract> {
        let enrollmentResult = await xml2js.parseStringPromise(decodeURIComponent(model.AuthenticationResponse).replace(/\+/g, ' '), { explicitArray: false, explicitRoot: false, tagNameProcessors: [this.camelCase], });
        const UserName = 'apitest'; //  api rollü kullanici adı
        const Password = 'api123'; //  api rollü kullanici sifresi
        const CustomerId = '400235'; // Müsteri Numarasi
        let server = 'https://boatest.kuveytturk.com.tr/boa.virtualpos.services/Home/ThreeDModelProvisionGate';
        let provision = new KuveytTurkVPosMessage(
            enrollmentResult.vPosMessage.amount,
            CustomerId,
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
            UserName,
            Password,
            server,
            TransactionType.Sale,
            0
        );
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
            }).pipe(map(d => {
                const paymentResult = xml2js.parseStringPromise(decodeURIComponent(d.data).replace(/\+/g, ' '), { explicitArray: false, explicitRoot: false, tagNameProcessors: [this.camelCase] });
                return paymentResult;

            })).pipe(catchError(e => {
                throw new HttpException(e.response.data, e.response.status);
            })).toPromise();
        }
    }

    async enrollment(tutar: number, creditCard: any): Promise<any> {
        const merchantOrderId = Date.now().toString();
        const CustomerId = '400235'; // Müsteri Numarasi
        const MerchantId = '496'; // Magaza Kodu
        const OkUrl = 'http://localhost:4000/api/online-islemler/odeme-basarili'; // Basarili sonuç alinirsa, yönledirelecek sayfa
        const FailUrl = 'http://localhost:4000/api/online-islemler/odeme-hatali'; // Basarisiz sonuç alinirsa, yönledirelecek sayfa
        const UserName = 'apitest'; //  api rollü kullanici adı
        const Password = 'api123'; //  api rollü kullanici sifresi
        const gServer = 'https://boatest.kuveytturk.com.tr/boa.virtualpos.services/Home/ThreeDModelPayGate';
        const payment = new KuveytTurkVPosMessage(
            Number(tutar).toLocaleString('tr-TR', { maximumFractionDigits: 2 }).replace('.', '').replace(',', ''),
            CustomerId,
            creditCard.cardHolderName,
            creditCard.cardNumber,
            creditCard.brandName ? creditCard.brandName : BrandName.MasterCard,
            creditCard.cardCVV2,
            creditCard.cardExpireDateMonth,
            creditCard.cardExpireDateYear.toString().substring(2),
            Currency.TRL,
            OkUrl,
            FailUrl,
            MerchantId,
            merchantOrderId,
            UserName,
            Password,
            gServer,
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
