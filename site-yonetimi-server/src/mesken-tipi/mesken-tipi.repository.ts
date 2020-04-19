import { EntityRepository, Repository } from 'typeorm';
import { MeskenTipi } from './mesken-tipi.entity';

@EntityRepository(MeskenTipi)
export class MeskenTipiRepository extends Repository<MeskenTipi> {
}
