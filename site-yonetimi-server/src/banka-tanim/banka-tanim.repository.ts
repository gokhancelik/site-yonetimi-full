import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { EntityRepository, Repository } from 'typeorm';
import { BankaTanim } from './banka-tanim.entity';

@EntityRepository(BankaTanim)
export class BankaTanimRepository extends BaseRepository<BankaTanim> {

}
