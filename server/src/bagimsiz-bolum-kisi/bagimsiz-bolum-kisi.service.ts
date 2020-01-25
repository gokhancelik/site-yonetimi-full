import { Injectable } from '@nestjs/common';
import { BaseService } from '../abstract/base.service';
import { BagimsizBolumKisi } from './bagimsiz-bolum-kisi.entity';
import { BagimsizBolumKisiRepository } from './bagimsiz-bolum-kisi.repository'
import { BagimsizBolumRepository } from '../bagimsiz-bolum/bagimsiz-bolum.repository';
@Injectable()
export class BagimsizBolumKisiService extends BaseService<BagimsizBolumKisi>{

    constructor(repository: BagimsizBolumKisiRepository) {
        super(repository);
    }
    async getByKisiId(kisiId: string) : Promise<BagimsizBolumKisi[]> {
        return this.repository.createQueryBuilder('bbk')
                .innerJoinAndSelect('bbk.bagimsizBolum', 'bb')                
                .where('bbk.kisiId = :kisiId', { kisiId: kisiId })
                .getMany();
    }
}