import { Controller, Request, Get, Param, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { BaseController } from '../abstract/base.controller';
import { MeskenKisi } from './mesken-kisi.entity';
import { MeskenKisiService } from './mesken-kisi.service';
import { ApiTags } from '@nestjs/swagger';
import { KisiCuzdan } from '../kisi-cuzdan/kisi-cuzdan.entity';
import { KisiCuzdanService } from '../kisi-cuzdan/kisi-cuzdan.service';
import { AuthGuard } from '@nestjs/passport';
import { Tahakkuk } from '../tahakkuk/tahakkuk.entity';
import { TahakkukService } from '../tahakkuk/tahakkuk.service';

@ApiTags('Mesken Kişi')
@Controller('mesken-kisi')
export class MeskenKisiController extends BaseController<MeskenKisi, MeskenKisiService> {
    constructor(service: MeskenKisiService,
        private kisiCuzdanService: KisiCuzdanService) {
        super(service);
    }

    @Get(':kisiId/kisiMeskens')
    getByKisiId(@Param('kisiId') kisiId: string): Promise<MeskenKisi[]> {
        return (this.service as MeskenKisiService).getByKisiId(kisiId);
    }

    @Get('/withKisi')
    getAllWithKisi(): Promise<MeskenKisi[]> {
        return this.service.getAllWithKisi();
    }
    @Get(':id/cuzdan')
    getKisiCuzdan(@Param('id') id: string): Promise<KisiCuzdan[]> {
        return this.kisiCuzdanService.getCuzdanByMeskenKisiId(id);
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('currentUserCuzdan')
    getCurrentUserCuzdan(@Request() request): Promise<KisiCuzdan[]> {
        return this.kisiCuzdanService.getCuzdan(request.user.userId);
    }
    @UseInterceptors(ClassSerializerInterceptor)
    // @UseGuards(AuthGuard('jwt'))
    @Get(':id/odenmemis-aidatlar')
    getOdenmemisAidatlar(@Param('id') id: string): Promise<Tahakkuk[]> {
        return this.service.getOdenmemisAidatlarByMeskenKisiId(id);
    }
}