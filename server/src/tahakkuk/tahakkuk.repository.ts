import { EntityRepository, Repository } from 'typeorm';
import { Tahakkuk } from './tahakkuk.entity';

@EntityRepository(Tahakkuk)
export class TahakkukRepository extends Repository<Tahakkuk> {

}
