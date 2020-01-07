import { Controller } from '@nestjs/common';
import { BaseController } from '../abstract/base.controller';
import { BagimsizBolumKisi } from './bagimsiz-bolum-kisi.entity';
import { BagimsizBolumKisiService } from './bagimsiz-bolum-kisi.service';

@Controller('bagimsiz-bolum-kisi')
export class BagimsizBolumKisiController extends BaseController<BagimsizBolumKisi, BagimsizBolumKisiService> {
    constructor(service: BagimsizBolumKisiService) {
        super(service);
    }
}