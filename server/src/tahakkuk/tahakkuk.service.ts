import { Injectable } from '@nestjs/common';
import { BaseService } from '../abstract/base.service';
import { Tahakkuk } from './tahakkuk.entity';
import { TahakkukRepository } from './tahakkuk.repository';
import { CurrentUser } from '../auth/current-user.decorator';
import { Kisi } from '../kisi/kisi.entity';
import { OdenmemisTahakkuk } from './odenmemis-tahakkuk.dto';

@Injectable()
export class TahakkukService extends BaseService<Tahakkuk> {


    constructor(repository: TahakkukRepository) {
        super(repository);
    }
    async getOdenmemisAidatlar(userId): Promise<OdenmemisTahakkuk[]> {
        let today = new Date();
        let gelecekAy = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        var aidatlar$ = this.repository.createQueryBuilder('tahakkuk')
            .innerJoin('tahakkuk.bagimsizBolumKisi', 'bbk')
            .leftJoinAndSelect('tahakkuk.tahakkukTahsilat', 'tahakkukTahsilat')
            .leftJoinAndSelect('tahakkukTahsilat.tahsilat', 'tahsilat')
            .where('bbk.kisiId = :userId', { userId })
            .andWhere('tahakkuk.durumu = 0 AND tahakkuk.vadeTarihi <= :tarih', { tarih: gelecekAy })
            .orderBy('tahakkuk.vadeTarihi')
            .getMany();
        return (await aidatlar$).map(t => {
            var a = new OdenmemisTahakkuk();
            a.id = t.id;
            a.aciklama = t.aciklama;
            a.faizOrani = t.faizOrani;
            a.odemeTipiId = t.odemeTipiId;
            a.tutar = t.tutar;
            a.odenenTutar = t.odenenTutar;
            a.sonTahsilatTarihi = t.sonTahsilatTarihi;
            a.vadeTarihi = t.vadeTarihi;
            a.kalanTutar = a.tutar - a.odenenTutar;
            a.faiz = a.faizHesapla();
            return a;
        });
    }
}
