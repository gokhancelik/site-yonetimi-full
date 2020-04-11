import { EntityRepository, Repository } from 'typeorm';
import { BagimsizBolumKisi } from './bagimsiz-bolum-kisi.entity';

@EntityRepository(BagimsizBolumKisi)
export class BagimsizBolumKisiRepository extends Repository<BagimsizBolumKisi> {
    
}
