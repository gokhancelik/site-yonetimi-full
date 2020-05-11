import { EntityRepository, Repository } from 'typeorm';
import { TahsilatSanalPosLog } from './tahsilat-sanal-pos-log.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(TahsilatSanalPosLog)
export class TahsilatSanalPosLogRepository extends BaseRepository<TahsilatSanalPosLog> {

}
