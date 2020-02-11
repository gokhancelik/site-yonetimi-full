import { EntityRepository, Repository } from 'typeorm';
import { Borc } from './borc.entity';

@EntityRepository(Borc)
export class BorcRepository extends Repository<Borc> {

}
