import { Controller, Get, Request, UseGuards, Post, Body, HttpService, HttpException, ClassSerializerInterceptor, UseInterceptors, Res } from '@nestjs/common';
import { Tahakkuk, AidatDurumu } from '../tahakkuk/tahakkuk.entity';
import { TahakkukService } from '../tahakkuk/tahakkuk.service';
import { AuthGuard } from '@nestjs/passport';
import { TahsilatService } from '../tahsilat/tahsilat.service';
import { Tahsilat, OdemeYontemi, TahsilatDurumu } from '../tahsilat/tahsilat.entity';
import { KuveytTurkSanalPosService } from '../sanal-pos/servisler/kuveyt-turk/kuveyt-turk-sanal-pos.service';
import { ApiTags } from '@nestjs/swagger';
import { GelirGiderTanimi } from '../gelir-gider-tanimi/gelir-gider-tanimi.entity';
import { TahsilatKalemService } from '../tahsilat-kalem/tahsilat-kalem.service';

@ApiTags('Online İşlemler')
@Controller('online-islemler')
export class OnlineIslemlerController {
    /**
     *
     */
    constructor(private service: TahakkukService,
        private tahsilatService: TahsilatService,
        private tahsilatKalemService: TahsilatKalemService,
        private readonly kuveytTurkSanalPosService: KuveytTurkSanalPosService) {
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

    // @UseGuards(AuthGuard('jwt'))
    // @Post('tahsilat-olustur')
    // tahsilatOlustur(@Body() seciliTahakkuklar: Tahakkuk[]): Promise<Tahsilat> {
    //     return this.service.krediKartiTahsilatiOlustur(seciliTahakkuklar);
    // }
    @Post('odeme-basarili')
    async odemeBasarili(@Body() model: any, @Res() res): Promise<any> {

        let provisionResult = await this.kuveytTurkSanalPosService.provision(model);
        let success = provisionResult.responseCode === '00';
        res.redirect('http://localhost:4200/online-islemler');
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

    // @UseGuards(AuthGuard('jwt'))
    @Post('odemeleri-dagit')
    async odemeleriDagit(): Promise<any> {
        let tahsilatList = await this.tahsilatService.getDagitilacakTahsilatlar();
        // let tahsilatList2 = tahsilatList.filter(p => p.meskenKisiId === '2EFFC39A-3882-EA11-80EE-887EF3F77D6E')
        for (const tahsilat of tahsilatList) {
            //tahsilat kalemlerini getir
            //tahsilat kalemiyle ilişkili olabilecek tahakkuklari getir
            // eskiden başlayarak öde 
            if (!tahsilat.kullanilanTutar) {
                tahsilat.kullanilanTutar = 0;
            }
            let tahakkuklar = await this.service.getOdenmemisAidatlar(tahsilat.meskenKisi.kisiId);
            for (const tk of tahsilat.tahsilatKalems) {
                if (tahsilat.kullanilabilirMiktar === 0) {
                    break;
                }
                let odemeTipis = [];
                if (tk.odemeTipi.kod === 'FZ') {
                    odemeTipis.push('01', '02', '03');
                } else {
                    odemeTipis.push(tk.odemeTipi.kod);
                }
                let iliskiliOlabilecekTahakkuklar = tahakkuklar.filter(tah => odemeTipis.includes(tah.odemeTipi.kod));
                for (const tahakkuk of iliskiliOlabilecekTahakkuklar) {
                    if (tahakkuk.odenecekTutar <= 0) {
                        tahakkuk.durumu = AidatDurumu.Odendi;
                        await this.service.update(tahakkuk.id, tahakkuk);
                        continue;
                    }
                    tahakkuk.odemeTarihi = tahsilat.odemeTarihi;
                    if (tahsilat.kullanilabilirMiktar > 0) {
                        let odenecekTutar = 0;
                        if (tahakkuk.odenecekTutar > tahsilat.kullanilabilirMiktar) {
                            odenecekTutar = tahsilat.kullanilabilirMiktar;
                        }
                        else {
                            odenecekTutar = tahakkuk.odenecekTutar;
                        }
                        if (tahsilat.odemeYontemi === OdemeYontemi.KrediKarti) {
                            odenecekTutar = odenecekTutar * 1.0168;
                        }
                        tahakkuk.odenenFaiz += tahakkuk.hesaplananFaiz;
                        tahakkuk.odenenTutar += odenecekTutar;
                        tahakkuk.sonTahsilatTarihi = tahsilat.odemeTarihi;
                        tahsilat.kullanilanTutar += odenecekTutar;
                        tk.tahakkukId = tahakkuk.id;
                        if (tahakkuk.odenecekTutar <= 0) {
                            tahakkuk.durumu = AidatDurumu.Odendi;
                        }
                        await this.tahsilatService.update(tahsilat.id, tahsilat);
                        await this.tahsilatKalemService.update(tk.id, tk);
                        await this.service.update(tahakkuk.id, tahakkuk);
                    } else {
                        break;
                    }
                }
            }
            if (tahsilat.kullanilabilirMiktar === 0) {
                tahsilat.durumu = TahsilatDurumu.Onaylandi;
                await this.tahsilatService.update(tahsilat.id, tahsilat);
            }
            // for (let j = 0; j < tahakkuklar.length; j++) {
            //     const tahakkuk = tahakkuklar[j];
            //     if (!tahakkuk.tutar) {
            //         tahakkuk.durumu = AidatDurumu.Odendi;
            //         await this.service.update(tahakkuk.id, tahakkuk);
            //         continue;
            //     }
            //     if (tahsilat.kullanilabilirMiktar > 0) {
            //         if (tahsilat.kullanilabilirMiktar > tahakkuk.odenecekTutar) {
            //             let karsilananMiktar = tahakkuk.odenecekTutar;
            //             tahakkuk.odenenTutar += karsilananMiktar;
            //             tahsilat.kullanilanTutar += karsilananMiktar;
            //         }
            //     } else {
            //         tahakkuk.odenenTutar += tahsilat.kullanilabilirMiktar;
            //         tahsilat.kullanilanTutar += tahsilat.kullanilabilirMiktar;
            //     }
            //     tahakkuk.sonTahsilatTarihi = tahsilat.odemeTarihi;
            //     await this.tahsilatService.update(tahsilat.id, tahsilat);
            //     await this.service.update(tahakkuk.id, tahakkuk);
            // }
        }
    }
}
