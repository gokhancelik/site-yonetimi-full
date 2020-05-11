import { EntityRepository, Repository } from 'typeorm';
import { HesapTanimi } from './hesap-tanimi.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(HesapTanimi)
export class HesapTanimiRepository extends BaseRepository<HesapTanimi> {

}
