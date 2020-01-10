import { Injectable } from '@nestjs/common';
import { BaseService } from '../abstract/base.service';
import { Tahakkuk } from './tahakkuk.entity';
import { TahakkukRepository } from './tahakkuk.repository';
import { CurrentUser } from '../auth/current-user.decorator';
import { Kisi } from '../kisi/kisi.entity';

@Injectable()
export class TahakkukService extends BaseService<Tahakkuk> {


    constructor(repository: TahakkukRepository) {
        super(repository);
    }
    getOdenmemisAidatlar(userId): Promise<Tahakkuk[]> {
        let today = new Date();
        let gelecekAy = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        return this.repository.createQueryBuilder('tahakkuk')
            .innerJoin('tahakkuk.bagimsizBolumKisi', 'bbk')
            .where('bbk.kisiId = :userId', { userId })
            .andWhere('tahakkuk.durumu = 0 AND tahakkuk.vadeTarihi <= :tarih', { tarih: gelecekAy })
            .orderBy('tahakkuk.vadeTarihi')
            .getMany();
    }
}
