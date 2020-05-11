import { Injectable } from '@nestjs/common';
import { Tahsilat, OdemeYontemi, TahsilatDurumu } from '../tahsilat/tahsilat.entity';
import { TahakkukService } from '../tahakkuk/tahakkuk.service';
import { Tahakkuk, AidatDurumu } from '../tahakkuk/tahakkuk.entity';
import { TahsilatKalem } from '../tahsilat-kalem/tahsilat-kalem.entity';
import { GelirGiderTanimi } from '../gelir-gider-tanimi/gelir-gider-tanimi.entity';
import { GelirGiderTanimiService } from '../gelir-gider-tanimi/gelir-gider-tanimi.service';
import { TahsilatKalemService } from '../tahsilat-kalem/tahsilat-kalem.service';
import { TahsilatService } from '../tahsilat/tahsilat.service';
import { HesapHareketi } from '../hesap-hareketi/hesap-hareketi.entity';
import { Connection } from 'typeorm';
import { TahsilatSanalPosLog } from '../tahsilat/tahsilat-sanal-pos-log.entity';
import { HesapHareketiService } from '../hesap-hareketi/hesap-hareketi.service';
import { TahsilatSanalPosLogService } from '../tahsilat/tahsilat-sanal-pos-log.service';

@Injectable()
export class OdemeIslemleriService {

    constructor(
        private readonly connection: Connection,
        private tahakkukService: TahakkukService,
        private tahsilatKalemService: TahsilatKalemService,
        private hesapHareketiService: HesapHareketiService,
        private tahsilatService: TahsilatService,
        private tahsilatSanalPosLogService: TahsilatSanalPosLogService,
        private gelirGiderTanimiService: GelirGiderTanimiService) {
    }
    async odemeleriDagit(sanalPosKomisyonOrani: number) {
        let tahsilatList = await this.tahsilatService.getDagitilacakTahsilatlar();
        // let tahsilatList2 = tahsilatList.filter(p => p.meskenKisiId === '2EFFC39A-3882-EA11-80EE-887EF3F77D6E')
        for (const tahsilat of tahsilatList) {
            //tahsilat kalemlerini getir
            //tahsilat kalemiyle ilişkili olabilecek tahakkuklari getir
            // eskiden başlayarak öde 
            if (!tahsilat.kullanilanTutar) {
                tahsilat.kullanilanTutar = 0;
            }
            let tahakkuklar = await this.tahakkukService.getOdenmemisAidatlar(tahsilat.meskenKisi.kisiId);
            for (const tk of tahsilat.tahsilatKalems) {

                if (tahsilat.kullanilabilirMiktar === 0) {
                    break;
                }
                let odemeTipis = [];
                if (tk.odemeTipi.kod === 'FZ') {
                    odemeTipis.push('01', '02', '03');
                } else {
                    odemeTipis.push(tk.odemeTipi.kod);
                }
                let iliskiliOlabilecekTahakkuklar = tahakkuklar.filter(tah => odemeTipis.includes(tah.odemeTipi.kod));
                for (const tahakkuk of iliskiliOlabilecekTahakkuklar) {
                    let kalanTutar = await this.tahakkukKalanTutarHesapla(tahakkuk);
                    if (kalanTutar <= 0) {
                        tahakkuk.durumu = AidatDurumu.Odendi;
                        await this.tahakkukService.update(tahakkuk.id, tahakkuk);
                        continue;
                    }
                    // tahakkuk.odemeTarihi = tahsilat.odemeTarihi;
                    if (tahsilat.kullanilabilirMiktar > 0) {
                        let odenecekTutar = 0;
                        if (Math.round(kalanTutar * 100) >= Math.round(tahsilat.kullanilabilirMiktar * 100)) {
                            odenecekTutar = tahsilat.kullanilabilirMiktar;
                        }
                        else {
                            odenecekTutar = kalanTutar;
                            tahakkuk.durumu = AidatDurumu.Odendi;
                        }
                        if (tahsilat.odemeYontemi === OdemeYontemi.KrediKarti) {
                            odenecekTutar = odenecekTutar * sanalPosKomisyonOrani;//TODO: sanal pos ayarından gelmesi lazım
                        }
                        tahakkuk.odenenTutar += odenecekTutar;
                        // tahakkuk.sonTahsilatTarihi = tahsilat.odemeTarihi;
                        tahsilat.kullanilanTutar += odenecekTutar;
                        tk.tahakkukId = tahakkuk.id;

                        await this.tahsilatService.update(tahsilat.id, tahsilat);
                        await this.tahsilatKalemService.update(tk.id, tk);
                        await this.tahakkukService.update(tahakkuk.id, tahakkuk);
                    } else {
                        break;
                    }
                }
            }
            if (tahsilat.kullanilabilirMiktar === 0) {
                tahsilat.durumu = TahsilatDurumu.Onaylandi;
                await this.tahsilatService.update(tahsilat.id, tahsilat);
            }
        }
    }
    async tahsilatOnayla(tahsilatId: string, bankaSiparisNo: string, hesapId: string): Promise<Tahsilat> {
        let tahsilat = await this.tahsilatService.findById(tahsilatId);
        let tahakkukIds: Array<{ tahakkukId: string, tutar: number }> = [];
        for (const tahsilatKalem of tahsilat.tahsilatKalems) {
            let tahakkukId = tahsilatKalem.tahakkukId;
            let tutar = tahsilatKalem.tutar;
            let tahakkuk = tahakkukIds.find(f => f.tahakkukId === tahakkukId);
            if (tahakkuk) {
                tahakkuk.tutar += tutar;
            } else {
                tahakkukIds.push({ tahakkukId: tahakkukId, tutar: tutar })
            }
        }
        for (const tahakkukId of tahakkukIds) {
            let tahakkuk = await this.tahakkukService.findById(tahakkukId.tahakkukId);
            tahakkuk.odenenTutar += tahakkukId.tutar;
            tahakkuk.durumu = AidatDurumu.Odendi;
            await this.tahakkukService.update(tahakkuk.id, tahakkuk);
        }
        tahsilat.bankaSiparisNo = bankaSiparisNo;
        tahsilat.durumu = TahsilatDurumu.Onaylandi;
        this.tahsilatService.update(tahsilatId, tahsilat);
        let hesapHareketi = new HesapHareketi(tahsilat.odemeTarihi, tahsilat.tutar, hesapId, tahsilat.id);
        await this.hesapHareketiService.create(hesapHareketi)
        return tahsilat;
    }
    async tahakkukOdeById(seciliTahakkukIds: string[], tutar: number, odemeTarihi: Date, odemeYontemi: OdemeYontemi, hesapId: string): Promise<Tahsilat> {
        let tahakkuklar = await this.tahakkukService.findByIds(seciliTahakkukIds);
        return await this.tahakkukOde(tahakkuklar, tutar, odemeTarihi, odemeYontemi, hesapId);
    }
    async tahakkukOde(tahakkuklar: Tahakkuk[], tutar: number, odemeTarihi: Date, odemeYontemi: OdemeYontemi, hesapId: string): Promise<Tahsilat> {
        let emanetTahsilatKalemleri = await this.tahsilatKalemService.getEmanetTahsilatKalemleri(tahakkuklar[0].meskenKisiId);
        tutar = tutar + (emanetTahsilatKalemleri.map(p => p.tutar).reduce((p, c) => p + c, 0));

        tahakkuklar = tahakkuklar.sort((t1, t2) => t1.vadeTarihi.getTime() - t2.vadeTarihi.getTime());
        let tahsilat = new Tahsilat();
        tahsilat.aciklama = tahakkuklar.map(m => m.aciklama).join(', ') + ' Ödemesi';
        tahsilat.durumu = TahsilatDurumu.Bekliyor;
        tahsilat.guncellemeTarihi = new Date();
        tahsilat.guncelleyen = 'username';
        tahsilat.meskenKisiId = tahakkuklar[0].meskenKisiId;
        tahsilat.odemeTarihi = odemeTarihi;
        tahsilat.odemeYontemi = odemeYontemi;
        tahsilat.olusturan = 'username';
        tahsilat.olusturmaTarihi = new Date();
        tahsilat.tahsilatKalems = [];
        tahsilat.tutar = tutar;
        tahsilat.durumu = TahsilatDurumu.Onaylandi;
        for (const tahakkuk of tahakkuklar) {
            if (tahsilat.kullanilabilirMiktar <= 0) {
                break;
            }
            var faizKalemi: TahsilatKalem = await this.faizKalemiOlustur(tahakkuk);
            if (faizKalemi.tutar)
                tahsilat.tahsilatKalems.push(faizKalemi);
            let kullanilacakTutar = 0;
            let kalanTutar = await this.tahakkukKalanTutarHesapla(tahakkuk);
            if (tahsilat.kullanilabilirMiktar >= (kalanTutar + faizKalemi.tutar)) {
                kullanilacakTutar = kalanTutar + faizKalemi.tutar;
                tahakkuk.durumu = AidatDurumu.Odendi;
            } else {
                kullanilacakTutar = tahsilat.kullanilabilirMiktar;
            }
            var tahakkukTahsilatKalemi = new TahsilatKalem();
            tahakkukTahsilatKalemi.odemeTipiId = tahakkuk.odemeTipiId;
            tahakkukTahsilatKalemi.tahakkukId = tahakkuk.id;
            tahakkukTahsilatKalemi.tutar = faizKalemi ? kullanilacakTutar - faizKalemi.tutar : kullanilacakTutar;
            tahakkuk.odenenTutar += tahakkukTahsilatKalemi.tutar;
            tahsilat.tahsilatKalems.push(tahakkukTahsilatKalemi);
            tahsilat.kullanilanTutar += kullanilacakTutar;
            await this.tahakkukService.update(tahakkuk.id, tahakkuk);
        }
        if (tahsilat.kullanilabilirMiktar) {
            var emanetTahsilatKalem = await this.emanetKalemiOlustur(tahsilat);
            tahsilat.tahsilatKalems.push(emanetTahsilatKalem);
        }
        await this.tahsilatService.create(tahsilat);
        for (const thk of tahsilat.tahsilatKalems) {
            thk.tahsilatId = tahsilat.id;
            await this.tahsilatKalemService.create(thk);
        }
        for (const etk of emanetTahsilatKalemleri) {
            this.tahsilatKalemService.delete(etk.id);
        }
        return tahsilat;
    }
    async emanetKalemiOlustur(tahsilat: Tahsilat): Promise<TahsilatKalem> {
        var tahsilatKalem = new TahsilatKalem();
        tahsilatKalem.tutar = tahsilat.kullanilabilirMiktar;
        let gelirTanimi = await this.gelirGiderTanimiService.getByKod(GelirGiderTanimi.Emanet);
        tahsilatKalem.odemeTipiId = gelirTanimi.id;
        tahsilatKalem.odemeTipi = gelirTanimi;
        return tahsilatKalem;
    }
    async tahakkukKalanTutarHesapla(tahakkuk: Tahakkuk): Promise<number> {
        let tahsilatKalemler = await this.tahsilatKalemService.getByTahakkukId(tahakkuk.id);
        let faizHaricOdenenTutar = tahsilatKalemler.filter(p => {
            return p.odemeTipi.kod !== GelirGiderTanimi.Faiz && p.odemeTipi.kod !== GelirGiderTanimi.BankaKomisyonu;
        }).map(p => p.tutar)
            .reduce((p, c) => p + c, 0);
        return tahakkuk.tutar - faizHaricOdenenTutar;
    }
    async faizKalemiOlustur(tahakkuk: Tahakkuk, odemeTarihi: Date = new Date()) {
        var tahsilatKalem = new TahsilatKalem();
        tahsilatKalem.tahakkukId = tahakkuk.id;
        tahsilatKalem.tutar = await this.faizHesapla(tahakkuk, odemeTarihi);
        let gelirTanimi = await this.gelirGiderTanimiService.getByKod(GelirGiderTanimi.Faiz);
        tahsilatKalem.odemeTipiId = gelirTanimi.id;
        tahsilatKalem.odemeTipi = gelirTanimi;
        return tahsilatKalem;
    }
    async bankaKomisyonuKalemiOlustur(tutar, oran: number) {
        var tahsilatKalem = new TahsilatKalem();
        tahsilatKalem.tutar = tutar * oran;
        let gelirTanimi = await this.gelirGiderTanimiService.getByKod(GelirGiderTanimi.BankaKomisyonu);
        tahsilatKalem.odemeTipiId = gelirTanimi.id;
        tahsilatKalem.odemeTipi = gelirTanimi;
        return tahsilatKalem;
    }
    async faizHesapla(tahakkuk: Tahakkuk, odemeTarihi = new Date()): Promise<number> {
        let tahsilatKalemler = await this.tahsilatKalemService.getByTahakkukId(tahakkuk.id);
        let sonTahsilatTarihi = tahsilatKalemler && tahsilatKalemler.length ? tahsilatKalemler.map(m => m.tahsilat.odemeTarihi).sort((a, b) => a.getTime() - b.getTime())[0] : null;
        var faiz = 0;
        if (tahakkuk.durumu == AidatDurumu.Icrada)
            return faiz;
        var tarih = tahakkuk.vadeTarihi;
        if (sonTahsilatTarihi && sonTahsilatTarihi > tahakkuk.vadeTarihi) {
            tarih = sonTahsilatTarihi;
        }
        var gunSayisi = ((odemeTarihi.getTime() - tarih.getTime()) / (1000 * 3600 * 24));
        var ay = Math.floor(gunSayisi) / 30;
        let kalanTutar = await this.tahakkukKalanTutarHesapla(tahakkuk);
        faiz = (kalanTutar) * tahakkuk.faizOrani * (ay > 0 ? ay : 0);
        return faiz;
    }
    async krediKartiTahsilatiOlustur(tahakkuklarDto: Tahakkuk[], komisyon: number): Promise<Tahsilat> {
        let tahakkuklar = await this.tahakkukService.findByIds(tahakkuklarDto.map(p => p.id))
        return await this.connection.transaction(async manager => {
            let tahsilat = new Tahsilat();
            tahsilat.aciklama = tahakkuklar.map(m => m.aciklama).join(', ') + ' Ödemesi';
            tahsilat.durumu = TahsilatDurumu.Bekliyor;
            tahsilat.guncellemeTarihi = new Date();
            tahsilat.guncelleyen = 'username';
            tahsilat.meskenKisiId = tahakkuklar[0].meskenKisiId;
            tahsilat.odemeTarihi = new Date();
            tahsilat.odemeYontemi = OdemeYontemi.KrediKarti;
            tahsilat.olusturan = 'username';
            tahsilat.olusturmaTarihi = new Date();
            tahsilat.tahsilatKalems = [];
            for (const tahakkuk of tahakkuklar) {
                var faizKalemi = await this.faizKalemiOlustur(tahakkuk);
                if (faizKalemi.tutar > 0) {
                    tahsilat.tahsilatKalems.push(faizKalemi);
                }
                let kalanTutar = await this.tahakkukKalanTutarHesapla(tahakkuk);
                var tahakkukTahsilatKalemi = new TahsilatKalem();
                tahakkukTahsilatKalemi.odemeTipiId = tahakkuk.odemeTipiId;
                tahakkukTahsilatKalemi.tahakkukId = tahakkuk.id;
                tahakkukTahsilatKalemi.tutar = faizKalemi ? kalanTutar - faizKalemi.tutar : kalanTutar;
                tahsilat.tahsilatKalems.push(tahakkukTahsilatKalemi);
            }
            var toplamTutar = tahsilat.tahsilatKalems.map(m => m.tutar).reduce((prev, current) => prev + current, 0);
            var bankaKomisyonu = await this.bankaKomisyonuKalemiOlustur(toplamTutar, komisyon);
            tahsilat.tahsilatKalems.push(bankaKomisyonu);
            tahsilat.tutar = tahsilat.tahsilatKalems.map(m => m.tutar).reduce((prev, current) => prev + current, 0);
            await manager.save(tahsilat);
            for (const thk of tahsilat.tahsilatKalems) {
                thk.tahsilatId = tahsilat.id;
                await manager.save(thk);
            }
            return tahsilat;
        });
    }
    async sanalPosLogEkle(tahsilatId: string, log: string, durum: boolean): Promise<TahsilatSanalPosLog> {
        let entity = new TahsilatSanalPosLog();
        entity.tahsilatId = tahsilatId;
        entity.mesaj = log;
        entity.durum = durum;
        await this.tahsilatSanalPosLogService.create(entity);
        return entity;
    }

}
