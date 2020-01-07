import { EntityRepository, Repository } from 'typeorm';
import { GelirGiderTanimi } from './gelir-gider-tanimi.entity';

@EntityRepository(GelirGiderTanimi)
export class GelirGiderTanimiRepository extends Repository<GelirGiderTanimi> {

}
