import { EntityRepository, Repository } from 'typeorm';
import { HesapTanimi } from './hesap-tanimi.entity';

@EntityRepository(HesapTanimi)
export class HesapTanimiRepository extends Repository<HesapTanimi> {

}
