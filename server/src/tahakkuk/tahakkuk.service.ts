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
    async aidatTahakkuklariOlustur(){
        //bagimsiz bolumleri cek;
        //her bğr bagimsiz bolum icin aidat grubunu,
        //aidat grubunun mktarini ve vade tarihini kullnarak tahakkuk entity olustur
        //kaydet

    }
    async borctanTahakkukOlustur(borcId){
        //borcu cek
        //borcun blogunun bagimsiz bolumleri cek;
        //herbir bagimsizbolume tutari paylastirarak tahakkuk olustur.
        //vade tarihini borcun vade tarihiyle set et.
        //kaydet 
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
