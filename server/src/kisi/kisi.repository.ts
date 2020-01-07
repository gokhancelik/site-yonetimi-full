import { EntityRepository, Repository } from 'typeorm';
import { Kisi } from './kisi.entity';

@EntityRepository(Kisi)
export class KisiRepository extends Repository<Kisi> {

}
