import { EntityRepository, Repository } from 'typeorm';
import { SanalPos } from './sanal-pos.entity';

@EntityRepository(SanalPos)
export class SanalPosRepository extends Repository<SanalPos> {

}
