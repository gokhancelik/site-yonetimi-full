import { EntityRepository, Repository } from 'typeorm';
import { Personel } from './personel.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(Personel)
export class PersonelRepository extends BaseRepository<Personel> {

}
