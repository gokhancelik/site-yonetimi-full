import { Controller, Get, Param } from '@nestjs/common';
import { BaseController } from '../abstract/base.controller';
import { MeskenKisi } from './mesken-kisi.entity';
import { MeskenKisiService } from './mesken-kisi.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Mesken Kişi')
@Controller('mesken-kisi')
export class MeskenKisiController extends BaseController<MeskenKisi, MeskenKisiService> {
    constructor(service: MeskenKisiService) {
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
}