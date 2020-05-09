import { EntityRepository, Repository } from 'typeorm';
import { TahsilatSanalPosLog } from './tahsilat-sanal-pos-log.entity';

@EntityRepository(TahsilatSanalPosLog)
export class TahsilatSanalPosLogRepository extends Repository<TahsilatSanalPosLog> {

}
