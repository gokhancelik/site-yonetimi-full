import { EntityRepository, Repository } from 'typeorm';
import { MeskenKisi } from './mesken-kisi.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(MeskenKisi)
export class MeskenKisiRepository extends BaseRepository<MeskenKisi> {
    
}
