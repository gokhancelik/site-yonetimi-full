import { EntityRepository, Repository } from 'typeorm';
import { Tahakkuk } from './tahakkuk.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(Tahakkuk)
export class TahakkukRepository extends BaseRepository<Tahakkuk> {

}
