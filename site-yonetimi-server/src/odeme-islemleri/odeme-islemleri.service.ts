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
import { KisiCuzdan } from '../kisi-cuzdan/kisi-cuzdan.entity';
import { TahsilatOlusturDto } from './tahsilat-olustur.dto';
import { KisiCuzdanService } from '../kisi-cuzdan/kisi-cuzdan.service';
import { MeskenKisiService } from '../mesken-kisi/mesken-kisi.service';
import { TahsilatOlusturSonucuDto } from './tahsilat-olustur-sonucu.dto';

@Injectable()
export class OdemeIslemleriService {

    constructor(
        private readonly connection: Connection,
        private tahakkukService: TahakkukService,
        private kisiCuzdanService: KisiCuzdanService,
        private tahsilatKalemService: TahsilatKalemService,
        private meskenKisiService: MeskenKisiService,
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
    // async tahsilatOnayla(tahsilatId: string, bankaSiparisNo: string, hesapId: string): Promise<Tahsilat> {
    //     let tahsilat = await this.tahsilatService.findById(tahsilatId);
    //     let tahakkukIds: Array<{ tahakkukId: string, tutar: number }> = [];
    //     for (const tahsilatKalem of tahsilat.tahsilatKalems) {
    //         let tahakkukId = tahsilatKalem.tahakkukId;
    //         let tutar = tahsilatKalem.tutar;
    //         let tahakkuk = tahakkukIds.find(f => f.tahakkukId === tahakkukId);
    //         if (tahakkuk) {
    //             tahakkuk.tutar += tutar;
    //         } else {
    //             tahakkukIds.push({ tahakkukId: tahakkukId, tutar: tutar })
    //         }
    //     }
    //     for (const tahakkukId of tahakkukIds) {
    //         let tahakkuk = await this.tahakkukService.findById(tahakkukId.tahakkukId);
    //         tahakkuk.odenenTutar += tahakkukId.tutar;
    //         tahakkuk.durumu = AidatDurumu.Odendi;
    //         await this.tahakkukService.update(tahakkuk.id, tahakkuk);
    //     }
    //     tahsilat.bankaSiparisNo = bankaSiparisNo;
    //     tahsilat.durumu = TahsilatDurumu.Onaylandi;
    //     this.tahsilatService.update(tahsilatId, tahsilat);
    //     let hesapHareketi = new HesapHareketi(tahsilat.odemeTarihi, tahsilat.tutar, hesapId, tahsilat.id);
    //     await this.hesapHareketiService.create(hesapHareketi)
    //     return tahsilat;
    // }
    // async tahakkukOdeById(seciliTahakkukIds: string[], tutar: number, odemeTarihi: Date, odemeYontemi: OdemeYontemi, hesapId: string): Promise<Tahsilat> {
    //     let tahakkuklar = await this.tahakkukService.findByIds(seciliTahakkukIds);
    //     return await this.tahakkukOde(tahakkuklar, tutar, odemeTarihi, odemeYontemi, hesapId);
    // }
    // async tahakkukOde(tahakkuklar: Tahakkuk[], tutar: number, odemeTarihi: Date, odemeYontemi: OdemeYontemi, hesapId: string): Promise<Tahsilat> {
    //     //let emanetTahsilatKalemleri = await this.tahsilatKalemService.getEmanetTahsilatKalemleri(tahakkuklar[0].meskenKisiId);
    //     // let emanetTutar = (emanetTahsilatKalemleri.map(p => p.tutar).reduce((p, c) => p + c, 0));

    //     tahakkuklar = tahakkuklar.sort((t1, t2) => t1.vadeTarihi.getTime() - t2.vadeTarihi.getTime());
    //     let tahsilat = new Tahsilat();
    //     tahsilat.aciklama = tahakkuklar.map(m => m.aciklama).join(', ') + ' Ödemesi';
    //     tahsilat.durumu = TahsilatDurumu.Bekliyor;
    //     tahsilat.guncellemeTarihi = new Date();
    //     tahsilat.guncelleyen = 'username';
    //     tahsilat.meskenKisiId = tahakkuklar[0].meskenKisiId;
    //     tahsilat.odemeTarihi = new Date(odemeTarihi);
    //     tahsilat.odemeYontemi = odemeYontemi;
    //     tahsilat.olusturan = 'username';
    //     tahsilat.olusturmaTarihi = new Date();
    //     tahsilat.tahsilatKalems = [];
    //     tahsilat.tutar = tutar;
    //     tahsilat.durumu = TahsilatDurumu.Onaylandi;
    //     let cuzdandakiParalar = await this.kisiCuzdanService.getCuzdan(tahsilat.meskenKisiId);
    //     for (const tahakkuk of tahakkuklar) {
    //         if (tahsilat.kullanilabilirMiktar <= 0) {
    //             break;
    //         }
    //         if (cuzdandakiParalar && cuzdandakiParalar.tutar > 0) {
    //             await this.cuzdandanOde(cuzdandakiParalar, tahakkuk, tahsilat);
    //         }
    //         if (tahakkuk.durumu === AidatDurumu.Odendi) {
    //             continue;
    //         }
    //         var faizKalemi: TahsilatKalem = await this.faizKalemiOlustur(tahakkuk, tahsilat.odemeTarihi);
    //         if (faizKalemi.tutar)
    //             tahsilat.tahsilatKalems.push(faizKalemi);
    //         let kullanilacakTutar = 0;
    //         let kalanTutar = await this.tahakkukKalanTutarHesapla(tahakkuk);
    //         if (tahsilat.kullanilabilirMiktar >= (kalanTutar + faizKalemi.tutar)) {
    //             kullanilacakTutar = kalanTutar + faizKalemi.tutar;
    //             tahakkuk.durumu = AidatDurumu.Odendi;
    //         } else {
    //             kullanilacakTutar = tahsilat.kullanilabilirMiktar;
    //         }
    //         var tahakkukTahsilatKalemi = new TahsilatKalem();
    //         tahakkukTahsilatKalemi.odemeTipiId = tahakkuk.odemeTipiId;
    //         tahakkukTahsilatKalemi.tahakkukId = tahakkuk.id;
    //         tahakkukTahsilatKalemi.tutar = faizKalemi ? kullanilacakTutar - faizKalemi.tutar : kullanilacakTutar;
    //         tahakkuk.odenenTutar += tahakkukTahsilatKalemi.tutar;
    //         tahsilat.tahsilatKalems.push(tahakkukTahsilatKalemi);
    //         tahsilat.kullanilanTutar += kullanilacakTutar;
    //         await this.tahakkukService.update(tahakkuk.id, tahakkuk);
    //     }
    //     await this.tahsilatService.create(tahsilat);
    //     if (tahsilat.kullanilabilirMiktar) {
    //         let cuzdanGecmisi = new KisiCuzdanGecmis();
    //         cuzdanGecmisi.tutar = tahsilat.kullanilabilirMiktar;
    //         cuzdanGecmisi.tahsilatId = tahsilat.id;
    //         await this.kisiCuzdanService.create(cuzdanGecmisi, tahsilat.meskenKisiId);
    //     }
    //     for (const thk of tahsilat.tahsilatKalems) {
    //         thk.tahsilatId = tahsilat.id;
    //         await this.tahsilatKalemService.create(thk);
    //     }
    //     return tahsilat;
    // }
    // async cuzdandanOde(cuzdan: KisiCuzdan, tahakkuk: Tahakkuk, tahsilat: Tahsilat) {
    //     var faizKalemi: TahsilatKalem = await this.faizKalemiOlustur(tahakkuk, tahsilat.odemeTarihi);
    //     if (faizKalemi.tutar)
    //         tahsilat.tahsilatKalems.push(faizKalemi);
    //     let kullanilacakTutar = 0;
    //     let kalanTutar = await this.tahakkukKalanTutarHesapla(tahakkuk);
    //     if (cuzdan.tutar > (kalanTutar + faizKalemi.tutar)) {
    //         kullanilacakTutar = kalanTutar + faizKalemi.tutar;
    //         tahakkuk.durumu = AidatDurumu.Odendi;
    //     } else {
    //         kullanilacakTutar = cuzdan.tutar;
    //     }
    //     let cuzdanGecmisi = new KisiCuzdanGecmis();
    //     cuzdanGecmisi.tutar = -kullanilacakTutar;
    //     // cuzdanGecmisi.tahsilatId = tahsilat.id;
    //     await this.kisiCuzdanService.create(cuzdanGecmisi, tahsilat.meskenKisiId);
    //     var tahakkukTahsilatKalemi = new TahsilatKalem();
    //     tahakkukTahsilatKalemi.odemeTipiId = tahakkuk.odemeTipiId;
    //     tahakkukTahsilatKalemi.tahakkukId = tahakkuk.id;
    //     tahakkukTahsilatKalemi.tutar = faizKalemi ? kullanilacakTutar - faizKalemi.tutar : kullanilacakTutar;
    //     tahakkuk.odenenTutar += tahakkukTahsilatKalemi.tutar;
    //     tahsilat.tahsilatKalems.push(tahakkukTahsilatKalemi);
    //     tahsilat.kullanilanTutar += kullanilacakTutar;
    //     await this.tahakkukService.update(tahakkuk.id, tahakkuk);
    //     // for (const thk of tahsilat.tahsilatKalems) {
    //     //     thk.tahsilatId = tahsilat.id;
    //     //     await this.tahsilatKalemService.create(thk);
    //     // }
    // }
    // async emanetKalemiOlustur(tahsilat: Tahsilat): Promise<TahsilatKalem> {
    //     var tahsilatKalem = new TahsilatKalem();
    //     tahsilatKalem.tutar = tahsilat.kullanilabilirMiktar;
    //     let gelirTanimi = await this.gelirGiderTanimiService.getByKod(GelirGiderTanimi.Emanet);
    //     tahsilatKalem.odemeTipiId = gelirTanimi.id;
    //     tahsilatKalem.odemeTipi = gelirTanimi;
    //     return tahsilatKalem;
    // }
    async tahakkukKalanTutarHesapla(tahakkuk: Tahakkuk): Promise<number> {
        let tahsilatKalemler = await this.tahsilatKalemService.getByTahakkukId(tahakkuk.id);
        let faizHaricOdenenTutar = tahsilatKalemler.filter(p => {
            return p.odemeTipi.kod !== GelirGiderTanimi.Faiz && p.odemeTipi.kod !== GelirGiderTanimi.BankaKomisyonu;
        }).map(p => p.tutar)
            .reduce((p, c) => p + c, 0);
        return tahakkuk.tutar - faizHaricOdenenTutar;
    }
    async faizKalemiOlustur(tahakkuk: Tahakkuk, odemeTarihi: Date) {
        var tahsilatKalem = new TahsilatKalem();
        tahsilatKalem.tahakkukId = tahakkuk.id;
        tahsilatKalem.tahakkuk = tahakkuk;
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
    async faizHesapla(tahakkuk: Tahakkuk, odemeTarihi): Promise<number> {
        let tahsilatKalemler = await this.tahsilatKalemService.getByTahakkukId(tahakkuk.id);
        let sonTahsilatTarihi = tahsilatKalemler && tahsilatKalemler.length ? tahsilatKalemler.map(m => m.tahsilat.odemeTarihi).sort((a, b) => b.getTime() - a.getTime())[0] : null;
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
    async tahsilatOlustur(dto: TahsilatOlusturDto): Promise<TahsilatOlusturSonucuDto> {
        let sonuc = new TahsilatOlusturSonucuDto();
        let tahsilatlar = new Array<Tahsilat>();
        let tahakkuklar = await this.tahakkukService.findByIds(dto.tahakkuks.map(p => p.id));
        let tutar = dto.tutar;
        let odemeTarihi = dto.odemeTarihi ?? new Date();
        let odemeYontemi = dto.odemeYontemi;
        let cuzdan = dto.cuzdan;
        if (tahakkuklar.length) {
            if (!tutar) {
                tahsilatlar.push(await this.tahakkuktanTahsilatOlustur(tahakkuklar, odemeTarihi));
            }
            else {
                if (cuzdan) {
                    let tahsilat = await this.tahakkukVeCuzdandanTahsilatOlustur(tahakkuklar, cuzdan);
                    tahsilatlar.push(tahsilat);
                }
                let tahsilat = await this.tahakkukVeTutardanTahsilatOlustur(tahakkuklar, tutar, odemeTarihi);
                if (tahsilat.kullanilabilirMiktar) {
                    sonuc.cuzdan = new KisiCuzdan();
                    sonuc.cuzdan.tutar = tahsilat.kullanilabilirMiktar;
                    sonuc.cuzdan.tahsilatId = tahsilat.id;
                    sonuc.cuzdan.aktifMi = true;
                    // await this.kisiCuzdanService.create(cuzdan, tahsilat.meskenKisi.kisiId);
                } else if (cuzdan) {
                    // await this.kisiCuzdanService.eskiKayitlariPasifYap(tahsilat.meskenKisi.kisiId);
                }
                tahsilatlar.push(tahsilat);
            }
        }
        sonuc.tahsilatlar = tahsilatlar;
        return sonuc;
    }
    async tahakkukVeCuzdandanTahsilatOlustur(tahakkuklar: Tahakkuk[], cuzdan: KisiCuzdan): Promise<Tahsilat> {
        let tahsilat = cuzdan.tahsilat;
        for (const tahakkuk of tahakkuklar) {
            var faizKalemi = await this.faizKalemiOlustur(tahakkuk, tahsilat.odemeTarihi);
            if (faizKalemi.tutar > 0) {
                if (faizKalemi.tutar >= tahsilat.kullanilabilirMiktar) {
                    faizKalemi.tutar = tahsilat.kullanilabilirMiktar;
                    tahsilat.kullanilanTutar += faizKalemi.tutar;
                    tahsilat.tahsilatKalems.push(faizKalemi);
                    break;
                } else {
                    tahsilat.kullanilanTutar += faizKalemi.tutar;
                    tahsilat.tahsilatKalems.push(faizKalemi);
                }
            }
            let gecerliTahakkukKalanTutar = await this.tahakkukKalanTutarHesapla(tahakkuk);
            if (tahsilat.kullanilabilirMiktar >= gecerliTahakkukKalanTutar) {
                var tahakkukTahsilatKalemi = new TahsilatKalem();
                tahakkukTahsilatKalemi.odemeTipiId = tahakkuk.odemeTipiId;
                tahakkukTahsilatKalemi.odemeTipi = tahakkuk.odemeTipi;
                tahakkukTahsilatKalemi.tahakkukId = tahakkuk.id;
                tahakkukTahsilatKalemi.tahakkuk = tahakkuk;
                tahakkukTahsilatKalemi.tutar = gecerliTahakkukKalanTutar;
                tahsilat.tahsilatKalems.push(tahakkukTahsilatKalemi);
                tahsilat.kullanilanTutar += tahakkukTahsilatKalemi.tutar;
            } else {
                var tahakkukTahsilatKalemi = new TahsilatKalem();
                tahakkukTahsilatKalemi.odemeTipiId = tahakkuk.odemeTipiId;
                tahakkukTahsilatKalemi.odemeTipi = tahakkuk.odemeTipi;
                tahakkukTahsilatKalemi.tahakkukId = tahakkuk.id;
                tahakkukTahsilatKalemi.tahakkuk = tahakkuk;
                tahakkukTahsilatKalemi.tutar = tahsilat.kullanilabilirMiktar;
                tahsilat.tahsilatKalems.push(tahakkukTahsilatKalemi);
                tahsilat.kullanilanTutar += tahakkukTahsilatKalemi.tutar;
                break;
            }
        }
        for (const thk of tahsilat.tahsilatKalems) {
            thk.tahsilatId = tahsilat.id;
        }
        return tahsilat;
    }
    async tahakkukVeTutardanTahsilatOlustur(tahakkuklar: Tahakkuk[], tutar: number, odemeTarihi: Date): Promise<Tahsilat> {
        let tahsilat = new Tahsilat();
        tahsilat.aciklama = tahakkuklar.map(m => m.aciklama).join(', ') + ' Ödemesi';
        tahsilat.durumu = TahsilatDurumu.Bekliyor;
        tahsilat.guncellemeTarihi = new Date();
        tahsilat.guncelleyen = 'username';
        tahsilat.meskenKisiId = tahakkuklar[0].meskenKisiId;
        tahsilat.meskenKisi = tahakkuklar[0].meskenKisi ?? await this.meskenKisiService.findById(tahakkuklar[0].meskenKisiId);
        tahsilat.odemeTarihi = new Date(odemeTarihi);
        tahsilat.odemeYontemi = OdemeYontemi.KrediKarti;
        tahsilat.olusturan = 'username';
        tahsilat.olusturmaTarihi = new Date();
        tahsilat.tahsilatKalems = [];
        tahsilat.tutar = tutar;
        tahsilat.kullanilanTutar = 0;
        for (const tahakkuk of tahakkuklar) {
            var faizKalemi = await this.faizKalemiOlustur(tahakkuk, tahsilat.odemeTarihi);
            if (faizKalemi.tutar > 0) {
                if (faizKalemi.tutar >= tahsilat.kullanilabilirMiktar) {
                    faizKalemi.tutar = tahsilat.kullanilabilirMiktar;
                    tahsilat.kullanilanTutar += faizKalemi.tutar;
                    tahsilat.tahsilatKalems.push(faizKalemi);
                    break;
                } else {
                    tahsilat.kullanilanTutar += faizKalemi.tutar;
                    tahsilat.tahsilatKalems.push(faizKalemi);
                }
            }
            let gecerliTahakkukKalanTutar = await this.tahakkukKalanTutarHesapla(tahakkuk);
            if (tahsilat.kullanilabilirMiktar >= gecerliTahakkukKalanTutar) {
                var tahakkukTahsilatKalemi = new TahsilatKalem();
                tahakkukTahsilatKalemi.odemeTipiId = tahakkuk.odemeTipiId;
                tahakkukTahsilatKalemi.odemeTipi = tahakkuk.odemeTipi;
                tahakkukTahsilatKalemi.tahakkukId = tahakkuk.id;
                tahakkukTahsilatKalemi.tahakkuk = tahakkuk;
                tahakkukTahsilatKalemi.tutar = gecerliTahakkukKalanTutar;
                tahsilat.tahsilatKalems.push(tahakkukTahsilatKalemi);
                tahsilat.kullanilanTutar += tahakkukTahsilatKalemi.tutar;
            } else {
                var tahakkukTahsilatKalemi = new TahsilatKalem();
                tahakkukTahsilatKalemi.odemeTipiId = tahakkuk.odemeTipiId;
                tahakkukTahsilatKalemi.odemeTipi = tahakkuk.odemeTipi;
                tahakkukTahsilatKalemi.tahakkukId = tahakkuk.id;
                tahakkukTahsilatKalemi.tahakkuk = tahakkuk;
                tahakkukTahsilatKalemi.tutar = tahsilat.kullanilabilirMiktar;
                tahsilat.tahsilatKalems.push(tahakkukTahsilatKalemi);
                tahsilat.kullanilanTutar += tahakkukTahsilatKalemi.tutar;
                break;
            }
        }
        for (const thk of tahsilat.tahsilatKalems) {
            thk.tahsilatId = tahsilat.id;
        }
        return tahsilat;
    }
    async tahakkuktanTahsilatOlustur(tahakkuklar: Tahakkuk[], odemeTarihi: Date) {
        let tahsilat = new Tahsilat();
        tahsilat.aciklama = tahakkuklar.map(m => m.aciklama).join(', ') + ' Ödemesi';
        tahsilat.durumu = TahsilatDurumu.Bekliyor;
        tahsilat.guncellemeTarihi = new Date();
        tahsilat.guncelleyen = 'username';
        tahsilat.meskenKisiId = tahakkuklar[0].meskenKisiId;
        tahsilat.odemeTarihi = new Date(odemeTarihi);
        tahsilat.odemeYontemi = OdemeYontemi.KrediKarti;
        tahsilat.olusturan = 'username';
        tahsilat.olusturmaTarihi = new Date();
        tahsilat.tahsilatKalems = [];
        for (const tahakkuk of tahakkuklar) {
            var faizKalemi = await this.faizKalemiOlustur(tahakkuk, tahsilat.odemeTarihi);
            if (faizKalemi.tutar > 0) {
                tahsilat.tahsilatKalems.push(faizKalemi);
            }
            let kalanTutar = await this.tahakkukKalanTutarHesapla(tahakkuk);
            var tahakkukTahsilatKalemi = new TahsilatKalem();
            tahakkukTahsilatKalemi.odemeTipiId = tahakkuk.odemeTipiId;
            tahakkukTahsilatKalemi.odemeTipi = tahakkuk.odemeTipi;
            tahakkukTahsilatKalemi.tahakkukId = tahakkuk.id;
            tahakkukTahsilatKalemi.tahakkuk = tahakkuk;
            tahakkukTahsilatKalemi.tutar = kalanTutar;
            tahsilat.tahsilatKalems.push(tahakkukTahsilatKalemi);
        }
        var toplamTutar = tahsilat.tahsilatKalems.map(m => m.tutar).reduce((prev, current) => prev + current, 0);
        tahsilat.tutar = toplamTutar;
        for (const thk of tahsilat.tahsilatKalems) {
            thk.tahsilatId = tahsilat.id;
        }
        return tahsilat;
    }
    async tahsilatKaydet(dto: TahsilatOlusturSonucuDto): Promise<Tahsilat[]> {
        for (const tahsilat of dto.tahsilatlar) {
            if (!tahsilat.id) {
                tahsilat.durumu = TahsilatDurumu.Onaylandi;
                await this.tahsilatService.create(tahsilat);
                let hesapHareketi = new HesapHareketi(tahsilat.odemeTarihi, tahsilat.tutar, dto.hesapId, tahsilat.id);
                await this.hesapHareketiService.create(hesapHareketi);

            } else {
                await this.tahsilatService.update(tahsilat.id, tahsilat);
                await this.kisiCuzdanService.create(dto.cuzdan, tahsilat.meskenKisi.kisiId);
            }
            for (const tk of tahsilat.tahsilatKalems) {
                tk.tahsilatId = tahsilat.id;
                await this.tahsilatKalemService.create(tk);
            }
        }
        return dto.tahsilatlar;
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
                var faizKalemi = await this.faizKalemiOlustur(tahakkuk, tahsilat.odemeTarihi);
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
