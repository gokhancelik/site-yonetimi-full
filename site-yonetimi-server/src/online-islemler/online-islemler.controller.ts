import { Controller, Get, Request, UseGuards, Post, Body, ClassSerializerInterceptor, UseInterceptors, Res, Param, ValidationPipe, UploadedFile } from '@nestjs/common';
import { Tahakkuk } from '../tahakkuk/tahakkuk.entity';
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
import { FileInterceptor } from '@nestjs/platform-express';
import xlsx from 'node-xlsx';
import { OdemeAktarimi } from '../odeme-islemleri/odeme-aktarimi.entity';

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
        let sanaPos = await this.sanalPosService.getAktif();
        let tahsilatSonucu = await this.odemeIslemleriService.krediKartiTahsilatiOlustur(seciliTahakkuklar, sanaPos);
        return await this.odemeIslemleriService.tahsilatKaydet(tahsilatSonucu, TahsilatDurumu.Bekliyor);
    }
    @Post('odeme-basarili')
    async odemeBasarili(@Body(new ValidationPipe({ transform: true })) model: any, @Res() res): Promise<any> {
        let provisionResult = await this.kuveytTurkSanalPosService.provision(model);
        res.redirect('http://cigdemadasi.turkuazvadisi.com/online-islemler/odeme-sonucu?sonucId=' + provisionResult.id);
    }
    @Post('odeme-hatali')
    async odemeHatali(@Body(new ValidationPipe({ transform: true })) model: any, @Res() res): Promise<any> {
        let result = await this.kuveytTurkSanalPosService.error(model);
        res.redirect('http://cigdemadasi.turkuazvadisi.com/online-islemler/odeme-sonucu?sonucId=' + result.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('odeme')
    async odeme(@Body() model: { tutar: number, creditCard: any, tahsilatId: string }): Promise<any> {
        // var baseUrl = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";
        return this.kuveytTurkSanalPosService.enrollment(model.tutar, model.creditCard, model.tahsilatId);
    }

    // @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file'))
    @Post('odemeleri-dagit')
    async odemeleriDagit(@UploadedFile() file): Promise<any> {
        const workSheetsFromBuffer = xlsx.parse(file.buffer,
            { raw: false }
            //     {
            //     type: 'binary',
            //     cellDates: true,
            //     cellNF: false,
            //     cellText: false
            // }
        );
        const result: OdemeAktarimi[] = [];
        for (let i = 1; i < workSheetsFromBuffer[0].data.length; i++) {
            const row: any[] = workSheetsFromBuffer[0].data[i];
            if (row.length === 0) {
                continue;
            }
            let dateParts = row[3].split('/')
            let odemeAktarimi = new OdemeAktarimi();
            odemeAktarimi.aktarimId = row[0],
                odemeAktarimi.bagimsizBolumKod = row[2],
                odemeAktarimi.odemeTarihi = new Date(Number('20' + dateParts[2]), dateParts[0] - 1, dateParts[1]),
                odemeAktarimi.bankaKodu = row[9],
                odemeAktarimi.aciklama = row[10],
                odemeAktarimi.odemeSekli = row[8],
                odemeAktarimi.odemeTipi = row[5],
                odemeAktarimi.odenenTutar = Number(row[7].replace('.', '').replace(',', '.'))
            result.push(odemeAktarimi);
        }
        await OdemeAktarimi.save(result, { chunk: 100 });
        // return result;

    }
    @Get(':logId/sanal-pos-log')
    getSanalPosLog(@Param('logId') logId: string): Promise<TahsilatSanalPosLog> {
        return (this.tahsilatSanalPosLog).findById(logId);
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('son-sanal-pos-log/:durum')
    getSonSanalPosLog(@Param('durum') durum: string, @Request() request): Promise<TahsilatSanalPosLog> {
        return (this.tahsilatSanalPosLog).getSonSanalPosLogByDurum(durum === 'basarili', request.user.userId);
    }
}
