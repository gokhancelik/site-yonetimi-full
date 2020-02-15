import { Controller, Get, Param } from '@nestjs/common';
import { BaseController } from '../abstract/base.controller';
import { BagimsizBolumKisi } from './bagimsiz-bolum-kisi.entity';
import { BagimsizBolumKisiService } from './bagimsiz-bolum-kisi.service';

@Controller('bagimsiz-bolum-kisi')
export class BagimsizBolumKisiController extends BaseController<BagimsizBolumKisi, BagimsizBolumKisiService> {
    constructor(service: BagimsizBolumKisiService) {
        super(service);
    }

    @Get(':kisiId/kisiBagimsizBolums')
    getByKisiId(@Param('kisiId') kisiId: string): Promise<BagimsizBolumKisi[]> {
        return (this.service as BagimsizBolumKisiService).getByKisiId(kisiId);
    }

    @Get('/withKisi')
    getAllWithKisi(): Promise<BagimsizBolumKisi[]> {
        return this.service.getAllWithKisi();
    }
}