import { EntityRepository, Repository } from 'typeorm';
import { Borc } from './borc.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(Borc)
export class BorcRepository extends BaseRepository<Borc> {

}
