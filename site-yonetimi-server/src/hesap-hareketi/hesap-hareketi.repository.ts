import { EntityRepository, Repository } from 'typeorm';
import { HesapHareketi } from './hesap-hareketi.entity';

@EntityRepository(HesapHareketi)
export class HesapHareketiRepository extends Repository<HesapHareketi> {

}
