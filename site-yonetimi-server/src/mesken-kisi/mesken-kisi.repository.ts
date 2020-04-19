import { EntityRepository, Repository } from 'typeorm';
import { MeskenKisi } from './mesken-kisi.entity';

@EntityRepository(MeskenKisi)
export class MeskenKisiRepository extends Repository<MeskenKisi> {
    
}
