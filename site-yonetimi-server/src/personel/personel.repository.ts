import { EntityRepository, Repository } from 'typeorm';
import { Personel } from './personel.entity';

@EntityRepository(Personel)
export class PersonelRepository extends Repository<Personel> {

}
