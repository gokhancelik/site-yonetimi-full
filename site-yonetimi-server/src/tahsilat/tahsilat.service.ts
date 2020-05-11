import { Injectable } from '@nestjs/common';
import { BaseService } from '../abstract/base.service';
import { Tahsilat, TahsilatDurumu, OdemeYontemi } from './tahsilat.entity';
import { TahsilatRepository } from './tahsilat.repository';
import { Connection } from 'typeorm';
import { TahsilatKalem } from '../tahsilat-kalem/tahsilat-kalem.entity';
import { GelirGiderTanimiService } from '../gelir-gider-tanimi/gelir-gider-tanimi.service';
import { TahakkukService } from '../tahakkuk/tahakkuk.service';
import { TahsilatSanalPosLog } from './tahsilat-sanal-pos-log.entity';
import { TahsilatSanalPosLogRepository } from './tahsilat-sanal-pos-log.repository';
import { HesapHareketiService } from '../hesap-hareketi/hesap-hareketi.service';
import { TahsilatKalemService } from '../tahsilat-kalem/tahsilat-kalem.service';

@Injectable()
export class TahsilatService extends BaseService<Tahsilat>{


    constructor(repository: TahsilatRepository,
        private readonly tahakkukService: TahakkukService,
        private readonly tahsilatKalemService: TahsilatKalemService,
        private readonly tahsilatSanalPosLogRepository: TahsilatSanalPosLogRepository    ) {
        super(repository);
    }
    getTahsilatlarByUserId(userId: any): Promise<Tahsilat[]> {
        return this.repository.createQueryBuilder('tahsilat')
            .innerJoin('tahsilat.meskenKisi', 'mk')
            .where('mk.kisiId = :userId and durumu = 1', { userId })
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
