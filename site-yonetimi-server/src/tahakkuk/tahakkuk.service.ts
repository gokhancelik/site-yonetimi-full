import { Injectable } from '@nestjs/common';
import { BaseService } from '../abstract/base.service';
import { Tahakkuk, AidatDurumu } from './tahakkuk.entity';
import { TahakkukRepository } from './tahakkuk.repository';

@Injectable()
export class TahakkukService extends BaseService<Tahakkuk> {



    constructor(repository: TahakkukRepository) {
        super(repository);
    }
    async aidatTahakkuklariOlustur() {
        //bagimsiz bolumleri cek;
        //her bğr bagimsiz bolum icin aidat grubunu,
        //aidat grubunun mktarini ve vade tarihini kullnarak tahakkuk entity olustur
        //kaydet

    }
    async borctanTahakkukOlustur() {
        //borcu cek
        //borcun blogunun bagimsiz bolumleri cek;
        //herbir meskene tutari paylastirarak tahakkuk olustur.
        //vade tarihini borcun vade tarihiyle set et.
        //kaydet 
    }
    async getOdenmemisAidatlar(userId): Promise<Tahakkuk[]> {
        let today = new Date();
        let gelecekAy = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        var aidatlar$ = this.repository.createQueryBuilder('tahakkuk')
            .innerJoinAndSelect('tahakkuk.meskenKisi', 'meskenKisi')
            .innerJoinAndSelect('tahakkuk.odemeTipi', 'odemeTipi')
            .where('meskenKisi.kisiId = :userId', { userId })
            .andWhere('tahakkuk.durumu = 0 AND tahakkuk.vadeTarihi <= :tarih', { tarih: gelecekAy })
            .orderBy('tahakkuk.vadeTarihi')
            .getMany();
        return (await aidatlar$).map(a => {
            a.odemeTarihi = new Date();
            return a;
        });
    }
    getOdenmisAidatlar(userId: any): Promise<Tahakkuk[]> {
        var aidatlar$ = this.repository.createQueryBuilder('tahakkuk')
            .innerJoinAndSelect('tahakkuk.meskenKisi', 'meskenKisi')
            .innerJoinAndSelect('tahakkuk.odemeTipi', 'odemeTipi')
            .where('meskenKisi.kisiId = :userId', { userId })
            .andWhere('tahakkuk.durumu = 1')
            .orderBy('tahakkuk.vadeTarihi')
            .getMany();
        return aidatlar$;
    }

    async odemeYap(tahakkukId, toplamTutar: number, tahsilatTarihi: Date = new Date()): Promise<Tahakkuk> {
        let tahakkuk = await this.findById(tahakkukId);
        if (Math.round(toplamTutar * 100) >= Math.round(tahakkuk.odenecekTutar * 100)) {
            tahakkuk.durumu = AidatDurumu.Odendi;
            tahakkuk.odemeTarihi = new Date();
        }
        tahakkuk.odenenTutar += toplamTutar;
        tahakkuk.sonTahsilatTarihi = tahsilatTarihi;
        await this.update(tahakkukId, tahakkuk);
        return tahakkuk;
    }
}
