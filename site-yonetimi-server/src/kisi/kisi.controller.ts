import { Controller, Get, Param, Request, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { BaseController } from '../abstract/base.controller';
import { Kisi } from './kisi.entity';
import { KisiService } from './kisi.service';
import { ApiTags } from '@nestjs/swagger';
import { MeskenKisi } from '../mesken-kisi/mesken-kisi.entity';
import { MeskenKisiService } from '../mesken-kisi/mesken-kisi.service';
import { Tahakkuk } from '../tahakkuk/tahakkuk.entity';
import { TahakkukService } from '../tahakkuk/tahakkuk.service';
import { Tahsilat } from '../tahsilat/tahsilat.entity';
import { TahsilatService } from '../tahsilat/tahsilat.service';

@ApiTags('Kişi')
@Controller('kisi')
export class KisiController extends BaseController<Kisi, KisiService> {
    constructor(service: KisiService,
        private tahakkukService: TahakkukService,
        private tahsilatService: TahsilatService,
        private meskenKisiService: MeskenKisiService) {
        super(service);
    }
    @Get(':id/meskens')
    getMeskens(@Param('id') id: string): Promise<MeskenKisi[]> {
        return this.meskenKisiService.getByKisiId(id);
    }
    @UseInterceptors(ClassSerializerInterceptor)
    // @UseGuards(AuthGuard('jwt'))
    @Get(':id/odenmemis-aidatlar')
    getOdenmemisAidatlar(@Param('id') id: string): Promise<Tahakkuk[]> {
        return this.tahakkukService.getOdenmemisAidatlar(id);
    }
    @UseInterceptors(ClassSerializerInterceptor)
    // @UseGuards(AuthGuard('jwt'))
    @Get(':id/odenmis-aidatlar')
    getOdenmisAidatlar(@Param('id') id: string): Promise<Tahakkuk[]> {
        return this.tahakkukService.getOdenmisAidatlar(id);
    }
    // @UseGuards(AuthGuard('jwt'))
    @Get(':id/tahsilatlar')
    getTahsilatlar(@Param('id') id: string): Promise<Tahsilat[]> {
        return this.tahsilatService.getTahsilatlarByUserId(id);
    }
}