import { EntityRepository, Repository } from 'typeorm';
import { TahsilatKalem } from './tahsilat-kalem.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { GelirGiderTanimi } from '../gelir-gider-tanimi/gelir-gider-tanimi.entity';

@EntityRepository(TahsilatKalem)
export class TahsilatKalemRepository extends BaseRepository<TahsilatKalem> {
    getEmanetTahsilatKalemleri(meskenKisiId: string): Promise<TahsilatKalem[]> {
        return this.createQueryBuilder('tk')
            .innerJoinAndSelect('tk.tahsilat', 'tahsilat')
            .innerJoinAndSelect('tk.odemeTipi', 'odemetipi')
            .where('tahsilat.meskenKisiId = :meskenKisiId and odemeTipi.kod =:odemeTipiKod', { meskenKisiId: meskenKisiId, odemeTipiKod: GelirGiderTanimi.Emanet })
            .getMany();
    }

    getByTahsilatId(tahsilatId: string): Promise<TahsilatKalem[]> {
        return this.createQueryBuilder('tk')
            .where('tk.tahsilatId = :tahsilatId', { tahsilatId: tahsilatId })
            .getMany();
    }
    getByTahakkukId(tahakkukId: string): Promise<TahsilatKalem[]> {
        return this.createQueryBuilder('tk')
            .innerJoinAndSelect('tk.tahsilat', 'tahsilat')
            .innerJoinAndSelect('tk.odemeTipi', 'odemetipi')
            .where('tk.tahakkukId = :tahakkukId and tahsilat.durumu = 1', { tahakkukId: tahakkukId })
            .getMany();
    }
}
