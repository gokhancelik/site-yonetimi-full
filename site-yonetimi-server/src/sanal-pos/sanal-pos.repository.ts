import { EntityRepository, Repository } from 'typeorm';
import { SanalPos } from './sanal-pos.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(SanalPos)
export class SanalPosRepository extends BaseRepository<SanalPos> {

}
