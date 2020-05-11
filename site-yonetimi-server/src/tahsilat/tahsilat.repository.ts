import { EntityRepository, Repository } from 'typeorm';
import { Tahsilat } from './tahsilat.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
@EntityRepository(Tahsilat)
export class TahsilatRepository extends BaseRepository<Tahsilat> {

}
