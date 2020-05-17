import { Controller, Get, Request, UseGuards, Post, Body, HttpService, HttpException, ClassSerializerInterceptor, UseInterceptors, Res, Param, ValidationPipe } from '@nestjs/common';
import { Tahakkuk, AidatDurumu } from '../tahakkuk/tahakkuk.entity';
import { TahakkukService } from '../tahakkuk/tahakkuk.service';
import { AuthGuard } from '@nestjs/passport';
import { TahsilatService } from '../tahsilat/tahsilat.service';
import { Tahsilat, OdemeYontemi, TahsilatDurumu } from '../tahsilat/tahsilat.entity';
import { KuveytTurkSanalPosService } from '../sanal-pos/servisler/kuveyt-turk/kuveyt-turk-sanal-pos.service';
import { ApiTags } from '@nestjs/swagger';
import { TahsilatKalemService } from '../tahsilat-kalem/tahsilat-kalem.service';
import { TahsilatSanalPosLogService } from '../tahsilat/tahsilat-sanal-pos-log.service';
import { TahsilatSanalPosLog } from '../tahsilat/tahsilat-sanal-pos-log.entity';
import { SanalPosService } from '../sanal-pos/sanal-pos.service';
import { OdemeIslemleriService } from '../odeme-islemleri/odeme-islemleri.service';
import { TahsilatOlusturSonucuDto } from '../odeme-islemleri/tahsilat-olustur-sonucu.dto';

@ApiTags('Online İşlemler')
@Controller('online-islemler')
export class OnlineIslemlerController {
    /**
     *
     */
    constructor(private service: TahakkukService,
        private tahsilatService: TahsilatService,
        private sanalPosService: SanalPosService,
        private odemeIslemleriService: OdemeIslemleriService,
        private tahsilatKalemService: TahsilatKalemService,
        private readonly kuveytTurkSanalPosService: KuveytTurkSanalPosService,
        private tahsilatSanalPosLog: TahsilatSanalPosLogService) {
    }
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(AuthGuard('jwt'))
    @Get('odenmemis-aidatlar')
    getOdenmemisAidatlar(@Request() request): Promise<Tahakkuk[]> {
        return this.service.getOdenmemisAidatlar(request.user.userId);
    }
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(AuthGuard('jwt'))
    @Get('odenmis-aidatlar')
    getOdenmisAidatlar(@Request() request): Promise<Tahakkuk[]> {
        return this.service.getOdenmisAidatlar(request.user.userId);
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('tahsilatlar')
    getTahsilatlar(@Request() request): Promise<Tahsilat[]> {
        return this.tahsilatService.getTahsilatlarByUserId(request.user.userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('tahsilat-olustur')
    @UseInterceptors(ClassSerializerInterceptor)
    async tahsilatOlustur(@Body(new ValidationPipe({ transform: true })) seciliTahakkuklar: Tahakkuk[]): Promise<Tahsilat> {
        let sanaPos = await this.sanalPosService.getByKod('kuveyt-turk-sanal-pos');
        let tahsilatSonucu = await this.odemeIslemleriService.krediKartiTahsilatiOlustur(seciliTahakkuklar, sanaPos.komisyon);
        let tahsilatlar = await this.odemeIslemleriService.tahsilatKaydet(tahsilatSonucu, TahsilatDurumu.Bekliyor);
        return tahsilatlar.find(p => p.odemeYontemi === OdemeYontemi.KrediKarti);
    }
    @Post('odeme-basarili')
    async odemeBasarili(@Body(new ValidationPipe({ transform: true })) model: any, @Res() res): Promise<any> {
        let provisionResult = await this.kuveytTurkSanalPosService.provision(model);
        res.redirect('http://localhost:4200/online-islemler/odeme-sonucu?sonucId=' + provisionResult.id);
    }
    @Post('odeme-hatali')
    async odemeHatali(@Body(new ValidationPipe({ transform: true })) model: any, @Res() res): Promise<any> {
        let result = await this.kuveytTurkSanalPosService.error(model);
        res.redirect('http://localhost:4200/online-islemler/odeme-sonucu?sonucId=' + result.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('odeme')
    async odeme(@Body() model: { tutar: number, creditCard: any, tahsilatId: string }): Promise<any> {
        // var baseUrl = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";
        return this.kuveytTurkSanalPosService.enrollment(model.tutar, model.creditCard, model.tahsilatId);
    }

    // @UseGuards(AuthGuard('jwt'))
    @Post('odemeleri-dagit')
    async odemeleriDagit(): Promise<any> {
        let sanaPos = await this.sanalPosService.getByKod('kuveyt-turk-sanal-pos');
        this.odemeIslemleriService.odemeleriDagit(sanaPos.komisyon);
    }
    @Get(':logId/sanal-pos-log')
    getSanalPosLog(@Param('logId') logId: string): Promise<TahsilatSanalPosLog> {
        return (this.tahsilatSanalPosLog).findById(logId);
    }
}
