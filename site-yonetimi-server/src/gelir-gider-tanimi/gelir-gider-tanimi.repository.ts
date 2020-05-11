import { EntityRepository, Repository } from 'typeorm';
import { GelirGiderTanimi } from './gelir-gider-tanimi.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(GelirGiderTanimi)
export class GelirGiderTanimiRepository extends BaseRepository<GelirGiderTanimi> {
    
    
    getByKod(kod: string): Promise<GelirGiderTanimi> {
        return this.findOne({ kod: kod });
    }
}
