import { EntityRepository, Repository } from 'typeorm';
import { Mesken } from './mesken.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(Mesken)
export class MeskenRepository extends BaseRepository<Mesken> {
    findByUstId(ustId: string): Promise<Mesken[]> {
        return this.createQueryBuilder('mesken')
            .where('mesken.ustId = :ustId', { ustId: ustId })
            .getMany();
    }
}
