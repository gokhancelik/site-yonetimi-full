import { Controller, Get, Request, UseGuards, Post, Body, HttpService } from '@nestjs/common';
import { Tahakkuk } from '../tahakkuk/tahakkuk.entity';
import { TahakkukService } from '../tahakkuk/tahakkuk.service';
import { AuthGuard } from '@nestjs/passport';
import { TahsilatService } from '../tahsilat/tahsilat.service';
import { Tahsilat } from '../tahsilat/tahsilat.entity';
import { OdenmemisTahakkuk } from '../tahakkuk/odenmemis-tahakkuk.dto';

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
    @UseGuards(AuthGuard('jwt'))
    @Post('odeme')
    async odeme(@Body() model: { tahsilat: Tahsilat, creditCard: any }): any {
        //var baseUrl = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";
        var merchantOrderId = model.tahsilat.id;
        var CustomerId = "400235"; //Müsteri Numarasi
        var MerchantId = "496"; //Magaza Kodu
        var OkUrl = "http://localhost:4000/OnlineIslemler/OdemeBasarili"; //Basarili sonuç alinirsa, yönledirelecek sayfa
        var FailUrl = "http://localhost:4000/OnlineIslemler/OdemeHatali"; //Basarisiz sonuç alinirsa, yönledirelecek sayfa
        var UserName = "apitest"; //  api rollü kullanici adı
        var Password = "api123";//  api rollü kullanici sifresi
        var gServer = "https://boatest.kuveytturk.com.tr/boa.virtualpos.services/Home/ThreeDModelPayGate";
        var payment = {
            Amount: model.tahsilat.tutar,
            CustomerId: CustomerId,
            CardHolderName: model.creditCard.cardHolderName,
            CardNumber: model.creditCard.cardNumber,
            CardType: model.creditCard.brandName,
            CardCVV2: model.creditCard.cardCVV2,
            CardExpireDateMonth: model.creditCard.cardExpireDateMonth,
            CardExpireDateYear: model.creditCard.cardExpireDateYear,
            CurrencyCode: 'TRL',
            FailUrl: FailUrl,
            MerchantId: MerchantId,
            MerchantOrderId: merchantOrderId,
            OkUrl: OkUrl,
            Password: Password,
            ServiceUrl: gServer,
            TransactionType: 'Sale',
            UserName: UserName,
            InstallmentCount: 0
        };
        var result = await this.httpService.post(payment.ServiceUrl, payment, {
            headers: {
                'Content-Type': 'application/xml',
            }
        }).toPromise();
        // var service = new KuveytTurkEnrollmentService();
        // var result = service.Enrollment(payment);
        return result;
    }



}
