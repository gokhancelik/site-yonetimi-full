import { EntityRepository, Repository } from 'typeorm';
import { Kisi } from './kisi.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(Kisi)
export class KisiRepository extends BaseRepository<Kisi> {

}
