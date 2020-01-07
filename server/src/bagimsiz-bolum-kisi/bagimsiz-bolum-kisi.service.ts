import { Injectable } from '@nestjs/common';
import { BaseService } from '../abstract/base.service';
import { BagimsizBolumKisi } from './bagimsiz-bolum-kisi.entity';
import { BagimsizBolumKisiRepository } from './bagimsiz-bolum-kisi.repository'
@Injectable()
export class BagimsizBolumKisiService extends BaseService<BagimsizBolumKisi>{

    constructor(repository: BagimsizBolumKisiRepository) {
        super(repository);
    }
}
