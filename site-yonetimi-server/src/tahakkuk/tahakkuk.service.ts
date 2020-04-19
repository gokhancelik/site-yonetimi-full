import { Injectable } from '@nestjs/common';
import { BaseService } from '../abstract/base.service';
import { Tahakkuk, AidatDurumu } from './tahakkuk.entity';
import { TahakkukRepository } from './tahakkuk.repository';
import { Tahsilat, TahsilatDurumu, OdemeYontemi } from '../tahsilat/tahsilat.entity';
import { TahsilatKalem } from '../tahsilat-kalem/tahsilat-kalem.entity';
import { GelirGiderTanimiService } from '../gelir-gider-tanimi/gelir-gider-tanimi.service';
import { GelirGiderTanimi, HareketTipi } from '../gelir-gider-tanimi/gelir-gider-tanimi.entity';
import { TahsilatService } from '../tahsilat/tahsilat.service';
import { TahsilatKalemService } from '../tahsilat-kalem/tahsilat-kalem.service';
import { HesapHareketi } from '../hesap-hareketi/hesap-hareketi.entity';
import { HesapHareketiService } from '../hesap-hareketi/hesap-hareketi.service';
import { Connection, TransactionManager, EntityManager } from 'typeorm';

@Injectable()
export class TahakkukService extends BaseService<Tahakkuk> {




    constructor(repository: TahakkukRepository,
        private readonly connection: Connection,
        private gelirGiderTanimiService: GelirGiderTanimiService) {
        super(repository);
    }
    async aidatTahakkuklariOlustur() {
        //bagimsiz bolumleri cek;
        //her bğr bagimsiz bolum icin aidat grubunu,
        //aidat grubunun mktarini ve vade tarihini kullnarak tahakkuk entity olustur
        //kaydet

    }
    async borctanTahakkukOlustur(borcId) {
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
    async ode(selectedTahakkukIds: string[], tutar: number, odemeTarihi: Date, hesapId: string, odemeYontemi: OdemeYontemi = OdemeYontemi.HavaleEFT): Promise<Tahakkuk[]> {
        return await this.connection.transaction(async manager => {
            tutar = Number(tutar);
            odemeTarihi = new Date(odemeTarihi);
            let selectedTahakkuks = await manager.createQueryBuilder(Tahakkuk, 'thk')
                .whereInIds(selectedTahakkukIds).andWhere('thk.durumu = :durumu', { durumu: AidatDurumu.Odenmedi }).orderBy('thk.vadeTarihi').getMany();
            if (!selectedTahakkuks || !selectedTahakkuks.length) {
                return Promise.all(selectedTahakkuks);
            }
            let meskenKisiId = selectedTahakkuks[0].meskenKisiId;
            let bakiyeKalanTahsilatlar = await manager.createQueryBuilder(Tahsilat, 'tah')
                .where('tah.meskenKisiId = :meskenKisiId', { meskenKisiId })
                .andWhere('tah.kullanilmamisTutar > 0').getMany();
            let kullanilmamisToplam = bakiyeKalanTahsilatlar.map(m => m.kullanilmamisTutar).reduce((p, c) => p + c, 0);
            let tahsilat = new Tahsilat();
            tahsilat.durumu = TahsilatDurumu.Onaylandi;
            tahsilat.meskenKisiId = meskenKisiId
            tahsilat.tahsilatKalems = new Array<TahsilatKalem>();
            tahsilat.odemeTarihi = odemeTarihi;
            tahsilat.tutar = tutar;
            tahsilat.odemeYontemi = odemeYontemi;
            let hesapHareketi = new HesapHareketi(odemeTarihi, tutar, hesapId, tahsilat.id, null);
            await manager.save(hesapHareketi);
            tutar += kullanilmamisToplam;
            for (const eskiTahsilat of bakiyeKalanTahsilatlar) {
                eskiTahsilat.kullanilmamisTutar = 0;
                await manager.save(eskiTahsilat);
            }
            for (const tahakkuk of selectedTahakkuks) {
                if (tutar == 0) {
                    break;
                }
                tahsilat.aciklama = tahsilat.aciklama ? [tahsilat.aciklama, tahakkuk.aciklama].join(', ') : tahakkuk.aciklama;
                tahakkuk.odemeTarihi = odemeTarihi;
                if (!tahakkuk.odenenTutar) {
                    tahakkuk.odenenTutar = 0;
                }
                let sonuc = await this.tahsilatKalemOlusturVeOde(tahakkuk, tutar, manager);
                manager.save(tahakkuk);
                tahsilat.tahsilatKalems.push(...sonuc.tahsilatKalems);
                tutar = sonuc.kalanTutar;
            }
            tahsilat.aciklama += ' Ödemesi';
            tahsilat.kullanilmamisTutar = tutar;
            await manager.save(tahsilat);
            for (const thk of tahsilat.tahsilatKalems) {
                thk.tahsilatId = tahsilat.id;
                await manager.save(thk);
            }

            return Promise.all(selectedTahakkuks);
        });
    }
    private async tahsilatKalemOlusturVeOde(tahakkuk: Tahakkuk, yatirilanTutar: number, @TransactionManager() manager?: EntityManager): Promise<{ tahsilatKalems: TahsilatKalem[], kalanTutar: number }> {
        let result = new Array<TahsilatKalem>();
        var tahsilatKalem = new TahsilatKalem();
        let kullanilanTutar = 0;
        if (tahakkuk.odenecekTutar < yatirilanTutar) {
            kullanilanTutar = tahakkuk.odenecekTutar;
            tahakkuk.odenenTutar += tahakkuk.odenecekTutar;
            tahakkuk.durumu = AidatDurumu.Odendi;
        }
        else if (tahakkuk.odenecekTutar === yatirilanTutar) {
            kullanilanTutar = yatirilanTutar;
            tahakkuk.odenenTutar += yatirilanTutar;
            tahakkuk.durumu = AidatDurumu.Odendi;
        }
        else {
            tahakkuk.odenenTutar += yatirilanTutar;
            kullanilanTutar = yatirilanTutar;
        }
        tahsilatKalem.odemeTipiId = tahakkuk.odemeTipiId;
        tahsilatKalem.tahakkukId = tahakkuk.id;
        tahsilatKalem.tutar = kullanilanTutar;
        result.push(tahsilatKalem);
        if (tahakkuk.faiz > 0) {
            var tahsilatKalem = await this.faizKalemiOlustur(tahsilatKalem, tahakkuk);
            result.push(tahsilatKalem);
        }
        // if (tahakkuk.bankaKomisyonu > 0) {
        //     var tahsilatKalem = await this.bankaKomisyonuKalemiOlustur(tahsilatKalem, tahakkuk);
        //     result.push(tahsilatKalem);
        // }
        return { tahsilatKalems: result, kalanTutar: yatirilanTutar - kullanilanTutar };
    }

    private async bankaKomisyonuKalemiOlustur(tahsilatKalem: TahsilatKalem, tahakkuk: Tahakkuk) {
        var tahsilatKalem = new TahsilatKalem();
        tahsilatKalem.tahakkukId = tahakkuk.id;
        tahsilatKalem.tutar = 0;
        tahsilatKalem.tahakkuk = tahakkuk;
        let gelirTanimi = await this.gelirGiderTanimiService.getByKod(GelirGiderTanimi.BankaKomisyonu);
        tahsilatKalem.odemeTipiId = gelirTanimi.id;
        tahsilatKalem.odemeTipi = gelirTanimi;
        return tahsilatKalem;
    }

    private async faizKalemiOlustur(tahsilatKalem: TahsilatKalem, tahakkuk: Tahakkuk) {
        var tahsilatKalem = new TahsilatKalem();
        tahsilatKalem.tahakkukId = tahakkuk.id;
        tahsilatKalem.tutar = tahakkuk.faiz;
        tahsilatKalem.tahakkuk = tahakkuk;
        let gelirTanimi = await this.gelirGiderTanimiService.getByKod(GelirGiderTanimi.Faiz);
        tahsilatKalem.odemeTipiId = gelirTanimi.id;
        tahsilatKalem.odemeTipi = gelirTanimi;
        return tahsilatKalem;
    }
}
