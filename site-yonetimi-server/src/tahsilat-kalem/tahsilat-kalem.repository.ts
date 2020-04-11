import { EntityRepository, Repository } from 'typeorm';
import { TahsilatKalem } from './tahsilat-kalem.entity';

@EntityRepository(TahsilatKalem)
export class TahsilatKalemRepository extends Repository<TahsilatKalem> {
    getByTahsilatId(tahsilatId: string): Promise<TahsilatKalem[]> {
        return this.createQueryBuilder('tk')
            .where('tk.tahsilatId = :tahsilatId', { tahsilatId: tahsilatId })
            .getMany();
    }
}
