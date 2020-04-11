import { EntityRepository, Repository } from 'typeorm';
import { BagimsizBolum } from './bagimsiz-bolum.entity';

@EntityRepository(BagimsizBolum)
export class BagimsizBolumRepository extends Repository<BagimsizBolum> {
    findByBlokId(blokId: string): Promise<BagimsizBolum[]> {
        return this.createQueryBuilder('bb')
            .where('bb.blokId = :blokId', { blokId: blokId })
            .getMany();
    }

}
