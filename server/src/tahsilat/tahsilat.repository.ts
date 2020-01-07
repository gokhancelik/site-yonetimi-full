import { EntityRepository, Repository } from 'typeorm';
import { Tahsilat } from './tahsilat.entity';

@EntityRepository(Tahsilat)
export class TahsilatRepository extends Repository<Tahsilat> {

}
