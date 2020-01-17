import { Controller, Get, Request, UseGuards, Post, Body, HttpService, HttpException } from '@nestjs/common';
import { Tahakkuk } from '../tahakkuk/tahakkuk.entity';
import { TahakkukService } from '../tahakkuk/tahakkuk.service';
import { AuthGuard } from '@nestjs/passport';
import { TahsilatService } from '../tahsilat/tahsilat.service';
import { Tahsilat } from '../tahsilat/tahsilat.entity';
import { OdenmemisTahakkuk } from '../tahakkuk/odenmemis-tahakkuk.dto';
import { KuveytTurkVPosMessage, Currency, TransactionType, BrandName, VPosTransactionResponseContract } from './kuveyt-turk-vpos-message';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as xml2js from 'xml2js';
@Controller('online-islemler')
export class OnlineIslemlerController {
    /**
     *
     */
    constructor(private service: TahakkukService,
        private tahsilatService: TahsilatService,
        private readonly httpService: HttpService) {
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('odenmemis-aidatlar')
    getOdenmemisAidatlar(@Request() request): Promise<OdenmemisTahakkuk[]> {
        return this.service.getOdenmemisAidatlar(request.user.userId);
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('tahsilatlar')
    getTahsilatlar(@Request() request): Promise<Tahsilat[]> {
        return this.tahsilatService.getTahsilatlarByUserId(request.user.userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('tahsilat-olustur')
    tahsilatOlustur(@Body() seciliTahakkuklar: OdenmemisTahakkuk[]): Promise<Tahsilat> {
        return this.tahsilatService.tahsilatOlustur(seciliTahakkuklar);
    }
    @Post('odeme-hatali')
    async odemeHatali(@Body() model: any): Promise<any> {
        const parser = new xml2js.Parser({ explicitArray: false });
        const sonuc: { sonuc?: boolean, hataKodu?: string, hataMesaji?: string } = {};
        parser.parseString(decodeURIComponent(model.AuthenticationResponse).replace(/\+/g, ' '),
            (err, result: { VPosTransactionResponseContract: VPosTransactionResponseContract }) => {
                sonuc.sonuc = false;
                sonuc.hataKodu = result.VPosTransactionResponseContract.ResponseCode;
                sonuc.hataMesaji = result.VPosTransactionResponseContract.ResponseMessage;
            });
        return of(sonuc).toPromise();
    }
    @UseGuards(AuthGuard('jwt'))
    @Post('odeme')
    async odeme(@Body() model: { tahsilat: Tahsilat, creditCard: any }): Promise<any> {
        // var baseUrl = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";
        const merchantOrderId = Date.now().toString();
        const CustomerId = '400235'; // Müsteri Numarasi
        const MerchantId = '496'; // Magaza Kodu
        const OkUrl = 'http://localhost:4000/api/online-islemler/odeme-basarili'; // Basarili sonuç alinirsa, yönledirelecek sayfa
        const FailUrl = 'http://localhost:4000/api/online-islemler/odeme-hatali'; // Basarisiz sonuç alinirsa, yönledirelecek sayfa
        const UserName = 'apitest'; //  api rollü kullanici adı
        const Password = 'api123'; //  api rollü kullanici sifresi
        const gServer = 'https://boatest.kuveytturk.com.tr/boa.virtualpos.services/Home/ThreeDModelPayGate';
        const payment = new KuveytTurkVPosMessage(
            model.tahsilat.tutar.toLocaleString('tr-TR').replace('.', '').replace(',', ''),
            CustomerId,
            model.creditCard.cardHolderName,
            model.creditCard.cardNumber,
            model.creditCard.brandName ? model.creditCard.brandName : BrandName.MasterCard,
            model.creditCard.cardCVV2,
            model.creditCard.cardExpireDateMonth,
            model.creditCard.cardExpireDateYear.toString().substring(2),
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
