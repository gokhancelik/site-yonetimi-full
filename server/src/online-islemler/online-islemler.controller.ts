import { Controller, Get, Request, UseGuards, Post, Body, HttpService, HttpException, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { Tahakkuk } from '../tahakkuk/tahakkuk.entity';
import { TahakkukService } from '../tahakkuk/tahakkuk.service';
import { AuthGuard } from '@nestjs/passport';
import { TahsilatService } from '../tahsilat/tahsilat.service';
import { Tahsilat } from '../tahsilat/tahsilat.entity';
import { KuveytTurkVPosMessage, Currency, TransactionType, BrandName, VPosTransactionResponseContract } from './kuveyt-turk-vpos-message';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as xml2js from 'xml2js';
import { KuveytTurkSanalPosService } from './kuveyt-turk-sanal-pos.service';
@Controller('online-islemler')
export class OnlineIslemlerController {
    /**
     *
     */
    constructor(private service: TahakkukService,
        private tahsilatService: TahsilatService,
        private readonly kuveytTurkSanalPosService: KuveytTurkSanalPosService) {
    }
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(AuthGuard('jwt'))
    @Get('odenmemis-aidatlar')
    getOdenmemisAidatlar(@Request() request): Promise<Tahakkuk[]> {
        return this.service.getOdenmemisAidatlar(request.user.userId);
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('tahsilatlar')
    getTahsilatlar(@Request() request): Promise<Tahsilat[]> {
        return this.tahsilatService.getTahsilatlarByUserId(request.user.userId);
    }

    // @UseGuards(AuthGuard('jwt'))
    // @Post('tahsilat-olustur')
    // tahsilatOlustur(@Body() seciliTahakkuklar: Tahakkuk[]): Promise<Tahsilat> {
    //     return this.service.krediKartiTahsilatiOlustur(seciliTahakkuklar);
    // }
    @Post('odeme-basarili')
    async odemeBasarili(@Body() model: any): Promise<any> {
        return this.kuveytTurkSanalPosService.provision(model);
    }
    @Post('odeme-hatali')
    async odemeHatali(@Body() model: any): Promise<any> {
        return this.kuveytTurkSanalPosService.error(model);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('odeme')
    async odeme(@Body() model: { tutar: number, creditCard: any }): Promise<any> {
        // var baseUrl = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";
        return this.kuveytTurkSanalPosService.enrollment(model.tutar, model.creditCard);
    }
}
