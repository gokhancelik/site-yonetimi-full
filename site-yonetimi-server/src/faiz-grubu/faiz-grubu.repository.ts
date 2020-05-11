import { EntityRepository, Repository } from 'typeorm';
import { FaizGrubu } from './faiz-grubu.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(FaizGrubu)
export class FaizGrubuRepository extends BaseRepository<FaizGrubu> {

}
