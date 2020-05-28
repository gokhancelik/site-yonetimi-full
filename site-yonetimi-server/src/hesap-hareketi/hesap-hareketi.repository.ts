import { EntityRepository, Repository } from 'typeorm';
import { HesapHareketi } from './hesap-hareketi.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(HesapHareketi)
export class HesapHareketiRepository extends BaseRepository<HesapHareketi> {
    
}
