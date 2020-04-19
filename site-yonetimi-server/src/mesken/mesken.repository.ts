import { EntityRepository, Repository } from 'typeorm';
import { Mesken } from './mesken.entity';

@EntityRepository(Mesken)
export class MeskenRepository extends Repository<Mesken> {
    findByUstId(ustId: string): Promise<Mesken[]> {
        return this.createQueryBuilder('mesken')
            .where('mesken.ustId = :ustId', { ustId: ustId })
            .getMany();
    }
}
