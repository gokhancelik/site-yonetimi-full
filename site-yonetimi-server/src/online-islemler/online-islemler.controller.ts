import { Controller, Get, Request, UseGuards, Post, Body, HttpService, HttpException, ClassSerializerInterceptor, UseInterceptors, Res } from '@nestjs/common';
import { Tahakkuk } from '../tahakkuk/tahakkuk.entity';
import { TahakkukService } from '../tahakkuk/tahakkuk.service';
import { AuthGuard } from '@nestjs/passport';
import { TahsilatService } from '../tahsilat/tahsilat.service';
import { Tahsilat } from '../tahsilat/tahsilat.entity';
import { KuveytTurkSanalPosService } from '../sanal-pos/servisler/kuveyt-turk/kuveyt-turk-sanal-pos.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Online İşlemler')
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
}
