import { EntityRepository, Repository } from 'typeorm';
import { AidatGrubu } from './aidat-grubu.entity';

@EntityRepository(AidatGrubu)
export class AidatGrubuRepository extends Repository<AidatGrubu> {

}
