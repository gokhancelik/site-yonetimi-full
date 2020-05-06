import { Injectable } from '@nestjs/common';
import { BaseService } from '../abstract/base.service';
import { Tahsilat } from './tahsilat.entity';
import { TahsilatRepository } from './tahsilat.repository';

@Injectable()
export class TahsilatService extends BaseService<Tahsilat>{

    constructor(repository: TahsilatRepository) {
        super(repository);
    }
    getTahsilatlarByUserId(userId: any): Promise<Tahsilat[]> {
        return this.repository.createQueryBuilder('tahsilat')
            .innerJoin('tahsilat.meskenKisi', 'mk')
            .where('mk.kisiId = :userId', { userId })
            .getMany();
    }
    getDagitilacakTahsilatlar(): Promise<Tahsilat[]> {
        return this.repository.createQueryBuilder('tahsilat')
            .innerJoinAndSelect('tahsilat.meskenKisi', 'mk')
            .innerJoinAndSelect('tahsilat.tahsilatKalems', 'tk')
            .innerJoinAndSelect('tk.odemeTipi', 'ot')
            .where('tahsilat.durumu = 0')
            .orderBy('tahsilat.odemeTarihi')
            // .andWhere('tahsilat.odemeYontemi <> 0')
            .getMany();
    }


}
