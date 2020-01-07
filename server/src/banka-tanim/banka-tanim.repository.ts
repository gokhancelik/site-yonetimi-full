import { EntityRepository, Repository } from 'typeorm';
import { BankaTanim } from './banka-tanim.entity';

@EntityRepository(BankaTanim)
export class BankaTanimRepository extends Repository<BankaTanim> {

}
