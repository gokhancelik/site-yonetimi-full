import { EntityRepository, Repository } from 'typeorm';
import { FaizGrubu } from './faiz-grubu.entity';

@EntityRepository(FaizGrubu)
export class FaizGrubuRepository extends Repository<FaizGrubu> {

}
