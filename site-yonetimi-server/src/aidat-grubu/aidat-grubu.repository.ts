import { EntityRepository, Repository } from 'typeorm';
import { AidatGrubu } from './aidat-grubu.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(AidatGrubu)
export class AidatGrubuRepository extends BaseRepository<AidatGrubu> {

}
