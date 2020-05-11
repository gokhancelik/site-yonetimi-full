import { EntityRepository, Repository } from 'typeorm';
import { MeskenTipi } from './mesken-tipi.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(MeskenTipi)
export class MeskenTipiRepository extends BaseRepository<MeskenTipi> {
}
