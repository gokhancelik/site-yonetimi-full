import { Controller, Get, Param } from '@nestjs/common';
import { BaseController } from '../abstract/base.controller';
import { Kisi } from './kisi.entity';
import { KisiService } from './kisi.service';
import { BagimsizBolumKisiService } from '../bagimsiz-bolum-kisi/bagimsiz-bolum-kisi.service';
import { BagimsizBolumKisi } from '../bagimsiz-bolum-kisi/bagimsiz-bolum-kisi.entity';

@Controller('kisi')
export class KisiController extends BaseController<Kisi, KisiService> {
    constructor(service: KisiService, private bbkService: BagimsizBolumKisiService) {
        super(service);
    }
    @Get(':id/BagimsizBolums')
    getBagimsizBolums(@Param('id') id: string): Promise<BagimsizBolumKisi[]> {
        return this.bbkService.getByKisiId(id);
    }
}