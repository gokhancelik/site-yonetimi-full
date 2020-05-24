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
import { Connection, MoreThanOrEqual } from 'typeorm';
import { TahsilatSanalPosLog } from '../tahsilat/tahsilat-sanal-pos-log.entity';
import { HesapHareketiService } from '../hesap-hareketi/hesap-hareketi.service';
import { TahsilatSanalPosLogService } from '../tahsilat/tahsilat-sanal-pos-log.service';
import { KisiCuzdan } from '../kisi-cuzdan/kisi-cuzdan.entity';
import { TahsilatOlusturDto } from './tahsilat-olustur.dto';
import { KisiCuzdanService } from '../kisi-cuzdan/kisi-cuzdan.service';
import { MeskenKisiService } from '../mesken-kisi/mesken-kisi.service';
import { TahsilatOlusturSonucuDto } from './tahsilat-olustur-sonucu.dto';
import { OdemeAktarimi } from './odeme-aktarimi.entity';
import { MeskenKisi } from '../mesken-kisi/mesken-kisi.entity';
import { HesapTanimiService } from '../hesap-tanimi/hesap-tanimi.service';

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
        private hesapTanimiService: HesapTanimiService,
        private gelirGiderTanimiService: GelirGiderTanimiService) {
    }
    async odemeleriDagit(sanalPosKomisyonOrani: number) {
        let butunOdemeler = await OdemeAktarimi.createQueryBuilder()
            .where('odenenTutar > islenenTutar and odenenTutar > 0 and bagimsizBolumKod is not null')
            .orderBy('odemeTarihi', 'ASC')
            .getMany();
        let uniqueBagimsizBolumKods = [...new Set(butunOdemeler.map(p => p.bagimsizBolumKod))];
        // [
        //     'AK3002',
        //     'AK3003',
        //     'AK3004',
        //     'AK3005',
        //     'AK3006',
        //     'AK3007',
        //     // 'B24023',
        //     // 'B24233',
        //     // 'AK3003',
        //     // 'AK3015',
        //     // 'AK3017',
        //     // 'B24309',
        //     // 'B24314',
        //     // 'B24334',
        //     // 'B24405'
        // ] //= [...new Set(butunOdemeler.map(p => p.bagimsizBolumKod))];
        let islemler = [];
        for (const bagimsizBolumKod of uniqueBagimsizBolumKods) {
            let odemeler = butunOdemeler.filter(p => p.bagimsizBolumKod === bagimsizBolumKod);
            let aktarim = this.aktarimYap(odemeler, bagimsizBolumKod, sanalPosKomisyonOrani);
            await aktarim;
            //islemler.push(aktarim);
        }
        // await Promise.all(islemler);
    }
    private async aktarimYap(odemeler: OdemeAktarimi[], bagimsizBolumKod: string, sanalPosKomisyonOrani: number): Promise<void> {
        let meskenKisi: MeskenKisi = await this.meskenKisiService.getByMeskenKod(bagimsizBolumKod);
        for (const odeme of odemeler) {
            let tahakkuklar = await this.tahakkukService.getOdenmemisAidatlar(meskenKisi.kisiId);
            let odemeYontemi = odeme.bankaKodu === '08' ? OdemeYontemi.KrediKarti : odeme.bankaKodu === 'DEVİR' ? OdemeYontemi.Devir : OdemeYontemi.HavaleEFT;
            let hesapTanim = await this.hesapTanimiService.findByAktarimId(odeme.bankaKodu);
            if (tahakkuklar.length) {
                let yeniTahsilatSonucu = await this.tahsilatOlustur({
                    tahakkuks: tahakkuklar,
                    tutar: odeme.odenenTutar,
                    odemeTarihi: odeme.odemeTarihi,
                    odemeYontemi: odemeYontemi,
                    komisyon: sanalPosKomisyonOrani
                });
                yeniTahsilatSonucu.hesapId = hesapTanim.id;
                let yeniTahsilatlar = await this.tahsilatKaydet(yeniTahsilatSonucu, TahsilatDurumu.Onaylandi);
            } else {
                let tahsilat = await this.tahakkuksuzTahsilatOlustur(meskenKisi.id, odeme.odemeTarihi, odemeYontemi, odeme.odenenTutar, sanalPosKomisyonOrani, odeme.odemeTipi);
                tahsilat.save();
                let hesapHareketi = new HesapHareketi(tahsilat.odemeTarihi, tahsilat.tutar, hesapTanim.id, tahsilat.id);
                await this.hesapHareketiService.create(hesapHareketi);
                let oncekiCuzdan = await this.kisiCuzdanService.getCuzdanByMeskenKisiId(meskenKisi.id);
                let toplamTutar = oncekiCuzdan ? oncekiCuzdan.tutar + tahsilat.kullanilabilirMiktar : tahsilat.kullanilabilirMiktar;
                await this.kisiCuzdanService.createByMeskenKisiId(toplamTutar, tahsilat.id, meskenKisi.id);
            }
            odeme.islenenTutar = odeme.odenenTutar;
            odeme.save();
        }
    }

    async tahakkukKalanTutarHesapla(tahakkuk: Tahakkuk, cuzdanTahsilati: Tahsilat): Promise<number> {
        return tahakkuk.kalanAnaPara;
    }
    async tahakkuksuzTahsilatOlustur(meskenKisiId: string, odemeTarihi: Date, odemeYontemi: OdemeYontemi, tutar: number, komisyon: number, odemeTipiKod: string) {
        let tahsilat = new Tahsilat();
        tahsilat.durumu = TahsilatDurumu.Onaylandi;
        tahsilat.meskenKisi = await this.meskenKisiService.findById(meskenKisiId);
        tahsilat.odemeTarihi = new Date(odemeTarihi);
        tahsilat.odemeYontemi = odemeYontemi;
        tahsilat.tahsilatKalems = [];
        tahsilat.tutar = tutar;
        tahsilat.kullanilanTutar = 0;
        let aciklama = [];
        if (odemeYontemi === OdemeYontemi.KrediKarti) {
            let komisyonKalemi = await this.bankaKomisyonuKalemiOlustur(tahsilat.tutar, komisyon);
            tahsilat.tahsilatKalems.push(komisyonKalemi);
            tahsilat.kullanilanTutar += komisyonKalemi.tutar;
        }
        let tahsilatKalem = new TahsilatKalem();
        tahsilatKalem.tutar = tahsilat.kullanilabilirMiktar;
        tahsilatKalem.odemeTipiId = (await this.gelirGiderTanimiService.getByKod(odemeTipiKod)).id;
        tahsilat.tahsilatKalems.push(tahsilatKalem);
        tahsilat.aciklama = 'Tahakkuksuz Ödeme';
        for (const thk of tahsilat.tahsilatKalems) {
            thk.tahsilatId = tahsilat.id;
        }
        return tahsilat;
    }
    async faizKalemiOlustur(tahakkuk: Tahakkuk, odemeTarihi: Date, cuzdanTahsilati: Tahsilat) {
        tahakkuk.odemeTarihi = odemeTarihi;
        var tahsilatKalem = new TahsilatKalem();
        tahsilatKalem.tahakkukId = tahakkuk.id;
        tahsilatKalem.tahakkuk = tahakkuk;
        tahsilatKalem.tutar = tahakkuk.faiz;
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
    async tahsilatOlustur(dto: TahsilatOlusturDto): Promise<TahsilatOlusturSonucuDto> {
        let sonuc = new TahsilatOlusturSonucuDto();
        let tahsilatlar = new Array<Tahsilat>();
        let tahakkuklar = await this.tahakkukService.findByIds(dto.tahakkuks.map(p => p.id));
        let tutar = dto.tutar;
        let odemeTarihi = new Date(dto.odemeTarihi);
        let odemeYontemi = dto.odemeYontemi;
        let cuzdan = await this.kisiCuzdanService.getCuzdanByMeskenKisiId(tahakkuklar[0].meskenKisiId);
        if (tahakkuklar.length) {
            let cuzdanTahsilati;
            if (cuzdan) {
                cuzdanTahsilati = await this.tahakkukVeCuzdandanTahsilatOlustur(tahakkuklar, cuzdan);
                tahsilatlar.push(cuzdanTahsilati);
            }
            if (!tutar) {
                tahsilatlar.push(await this.tahakkuktanTahsilatOlustur(tahakkuklar, odemeTarihi, cuzdanTahsilati, odemeYontemi, dto.komisyon));
            }
            else {
                let tahsilat = await this.tahakkukVeTutardanTahsilatOlustur(tahakkuklar, tutar, odemeTarihi, cuzdanTahsilati, odemeYontemi, dto.komisyon);
                if (tahsilat.kullanilabilirMiktar) {
                    sonuc.cuzdan = new KisiCuzdan();
                    sonuc.cuzdan.tutar = tahsilat.kullanilabilirMiktar;
                    sonuc.cuzdan.tahsilatId = tahsilat.id;
                    sonuc.cuzdan.aktifMi = true;
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
            var faizKalemi = await this.faizKalemiOlustur(tahakkuk, tahsilat.odemeTarihi, null);
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
            let gecerliTahakkukKalanTutar = await this.tahakkukKalanTutarHesapla(tahakkuk, null);
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
    async tahakkukVeTutardanTahsilatOlustur(tahakkuklar: Tahakkuk[], tutar: number, odemeTarihi: Date, cuzdanTahsilati: Tahsilat, odemeYontemi: OdemeYontemi, komisyon: number): Promise<Tahsilat> {
        let tahsilat = new Tahsilat();
        tahsilat.durumu = TahsilatDurumu.Bekliyor;
        tahsilat.guncellemeTarihi = new Date();
        tahsilat.guncelleyen = 'username';
        tahsilat.meskenKisiId = tahakkuklar[0].meskenKisiId;
        tahsilat.meskenKisi = tahakkuklar[0].meskenKisi ?? await this.meskenKisiService.findById(tahakkuklar[0].meskenKisiId);
        tahsilat.odemeTarihi = new Date(odemeTarihi);
        tahsilat.odemeYontemi = odemeYontemi;
        tahsilat.olusturan = 'username';
        tahsilat.olusturmaTarihi = new Date();
        tahsilat.tahsilatKalems = [];
        tahsilat.tutar = tutar;
        tahsilat.kullanilanTutar = 0;
        let aciklama = [];
        if (odemeYontemi === OdemeYontemi.KrediKarti) {
            let komisyonKalemi = await this.bankaKomisyonuKalemiOlustur(tahsilat.tutar, komisyon);
            tahsilat.tahsilatKalems.push(komisyonKalemi);
            tahsilat.kullanilanTutar += komisyonKalemi.tutar;
        }
        for (const tahakkuk of tahakkuklar) {
            var faizKalemi = await this.faizKalemiOlustur(tahakkuk, tahsilat.odemeTarihi, cuzdanTahsilati);
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
            let gecerliTahakkukKalanTutar = await this.tahakkukKalanTutarHesapla(tahakkuk, cuzdanTahsilati);
            if (tahsilat.kullanilabilirMiktar >= gecerliTahakkukKalanTutar) {
                var tahakkukTahsilatKalemi = new TahsilatKalem();
                tahakkukTahsilatKalemi.odemeTipiId = tahakkuk.odemeTipiId;
                tahakkukTahsilatKalemi.odemeTipi = tahakkuk.odemeTipi;
                tahakkukTahsilatKalemi.tahakkukId = tahakkuk.id;
                tahakkukTahsilatKalemi.tahakkuk = tahakkuk;
                tahakkukTahsilatKalemi.tutar = gecerliTahakkukKalanTutar;
                tahsilat.tahsilatKalems.push(tahakkukTahsilatKalemi);
                tahsilat.kullanilanTutar += tahakkukTahsilatKalemi.tutar;
                aciklama.push(tahakkuk.aciklama);
            } else {
                var tahakkukTahsilatKalemi = new TahsilatKalem();
                tahakkukTahsilatKalemi.odemeTipiId = tahakkuk.odemeTipiId;
                tahakkukTahsilatKalemi.odemeTipi = tahakkuk.odemeTipi;
                tahakkukTahsilatKalemi.tahakkukId = tahakkuk.id;
                tahakkukTahsilatKalemi.tahakkuk = tahakkuk;
                tahakkukTahsilatKalemi.tutar = tahsilat.kullanilabilirMiktar;
                tahsilat.tahsilatKalems.push(tahakkukTahsilatKalemi);
                tahsilat.kullanilanTutar += tahakkukTahsilatKalemi.tutar;
                aciklama.push(tahakkuk.aciklama);
                break;
            }

        }
        tahsilat.aciklama = aciklama.join(', ') + ' Ödemesi';
        for (const thk of tahsilat.tahsilatKalems) {
            thk.tahsilatId = tahsilat.id;
        }
        return tahsilat;
    }
    async tahakkuktanTahsilatOlustur(tahakkuklar: Tahakkuk[], odemeTarihi: Date, cuzdanTahsilati: Tahsilat, odemeYontemi: OdemeYontemi, komisyon: number) {
        let tahsilat = new Tahsilat();
        tahsilat.durumu = TahsilatDurumu.Bekliyor;
        tahsilat.guncellemeTarihi = new Date();
        tahsilat.guncelleyen = 'username';
        tahsilat.meskenKisiId = tahakkuklar[0].meskenKisiId;
        tahsilat.odemeTarihi = new Date(odemeTarihi);
        tahsilat.odemeYontemi = odemeYontemi;
        tahsilat.olusturan = 'username';
        tahsilat.olusturmaTarihi = new Date();
        tahsilat.tahsilatKalems = [];
        if (odemeYontemi === OdemeYontemi.KrediKarti) {
            let komisyonKalemi = await this.bankaKomisyonuKalemiOlustur(tahsilat.tutar, komisyon);
            tahsilat.tahsilatKalems.push(komisyonKalemi);
            tahsilat.kullanilanTutar += komisyonKalemi.tutar;
        }
        let aciklama = [];
        for (const tahakkuk of tahakkuklar) {
            var faizKalemi = await this.faizKalemiOlustur(tahakkuk, tahsilat.odemeTarihi, cuzdanTahsilati);
            if (faizKalemi.tutar > 0) {
                tahsilat.tahsilatKalems.push(faizKalemi);
            }
            let kalanTutar = await this.tahakkukKalanTutarHesapla(tahakkuk, cuzdanTahsilati);
            var tahakkukTahsilatKalemi = new TahsilatKalem();
            tahakkukTahsilatKalemi.odemeTipiId = tahakkuk.odemeTipiId;
            tahakkukTahsilatKalemi.odemeTipi = tahakkuk.odemeTipi;
            tahakkukTahsilatKalemi.tahakkukId = tahakkuk.id;
            tahakkukTahsilatKalemi.tahakkuk = tahakkuk;
            tahakkukTahsilatKalemi.tutar = kalanTutar;
            tahsilat.tahsilatKalems.push(tahakkukTahsilatKalemi);
            aciklama.push(tahakkuk.aciklama);
        }
        var toplamTutar = tahsilat.tahsilatKalems.map(m => m.tutar).reduce((prev, current) => prev + current, 0);
        tahsilat.tutar = toplamTutar;
        tahsilat.aciklama = aciklama.join(', ') + ' Ödemesi';
        for (const thk of tahsilat.tahsilatKalems) {
            thk.tahsilatId = tahsilat.id;
        }
        return tahsilat;
    }
    async tahsilatKaydet(dto: TahsilatOlusturSonucuDto, tahsilatDurumu = TahsilatDurumu.Onaylandi): Promise<Tahsilat[]> {
        //eski cüzdan varsa iki tahsilat gelir
        //cüzdan tahsilatından ödemeyi yap
        let eskiCuzdanTahsilati = dto.tahsilatlar.find(p => !!p.id);
        if (eskiCuzdanTahsilati) {
            //veri geldiğinde kullanılan tutar değişmiş olduğu için güncelle
            await this.tahsilatService.update(eskiCuzdanTahsilati.id, eskiCuzdanTahsilati);
            let yeniEklenenTahsilatKalemleri = eskiCuzdanTahsilati.tahsilatKalems.filter(p => !p.id);
            for (const tahsilatKalem of yeniEklenenTahsilatKalemleri) {
                tahsilatKalem.tahsilatId = eskiCuzdanTahsilati.id;
                await this.tahsilatKalemService.create(tahsilatKalem);
            }
            let uniqueTahakkukIds = [...new Set(yeniEklenenTahsilatKalemleri.map(p => p.tahakkukId))];
            let tahakkuks = await this.tahakkukService.findByIds(uniqueTahakkukIds);
            for (const tahakkuk of tahakkuks) {
                let kalanTutar = await this.tahakkukKalanTutarHesapla(tahakkuk, null);
                if (kalanTutar <= 0) {
                    await this.tahakkukService.tahakkukKapat(tahakkuk);
                }
            }
        }
        //yeni oluşacak tahsilattan ödemeyi yap
        let yeniTahsilat = dto.tahsilatlar.find(p => !eskiCuzdanTahsilati || p.id !== eskiCuzdanTahsilati.id);
        if (yeniTahsilat) {
            yeniTahsilat.durumu = tahsilatDurumu;
            await this.tahsilatService.create(yeniTahsilat);
            for (const tk of yeniTahsilat.tahsilatKalems) {
                tk.tahsilatId = yeniTahsilat.id;
                await this.tahsilatKalemService.create(tk);
            }
            if (yeniTahsilat.durumu === TahsilatDurumu.Onaylandi) {
                let hesapHareketi = new HesapHareketi(yeniTahsilat.odemeTarihi, yeniTahsilat.tutar, dto.hesapId, yeniTahsilat.id);
                await this.hesapHareketiService.create(hesapHareketi);
                let uniqueTahakkukIds = [...new Set(yeniTahsilat.tahsilatKalems.map(p => p.tahakkukId))];
                let tahakkuks = await this.tahakkukService.findByIds(uniqueTahakkukIds);
                for (const tahakkuk of tahakkuks) {
                    //cuzdan tahsilat kalemleri eskiler de geliyor. Sen hepsini create ediyon. 
                    let kalanTutar = await this.tahakkukKalanTutarHesapla(tahakkuk, null); //Transaction yaptiginda burasi duzeltilecek asagidaki gibi
                    //bu tahsilattaki tutarlari bul oncekilerle topla kalan tutari sonra kontrol et
                    if (kalanTutar <= 0) {
                        await this.tahakkukService.tahakkukKapat(tahakkuk);
                    }
                }
            }

        }
        if (dto.cuzdan) {
            dto.cuzdan.tahsilatId = yeniTahsilat.id;
            await this.kisiCuzdanService.createByMeskenKisiId(dto.cuzdan.tutar, yeniTahsilat.id, yeniTahsilat.meskenKisiId);
        } else {
            await this.kisiCuzdanService.eskiKayitlariPasifYapMeskenKisiId(yeniTahsilat.meskenKisiId);
        }
        return dto.tahsilatlar;
        // for (const tahsilat of dto.tahsilatlar) {
        //     let cuzdanTahsilati;
        //     if (tahsilat.id) {
        //         cuzdanTahsilati = tahsilat;
        //         await this.tahsilatService.update(tahsilat.id, tahsilat);
        //         await this.kisiCuzdanService.eskiKayitlariPasifYap(tahsilat.meskenKisi.kisiId);
        //     } else {
        //         tahsilat.durumu = tahsilatDurumu;
        //         await this.tahsilatService.create(tahsilat);
        //         let hesapHareketi = new HesapHareketi(tahsilat.odemeTarihi, tahsilat.tutar, dto.hesapId, tahsilat.id);
        //         if (tahsilat.durumu === TahsilatDurumu.Onaylandi) {
        //             await this.hesapHareketiService.create(hesapHareketi);
        //         }
        //     }
        //     if (dto.cuzdan) {
        //         dto.cuzdan.tahsilatId = tahsilat.id;
        //         await this.kisiCuzdanService.create(dto.cuzdan, tahsilat.meskenKisi.kisiId);
        //     }
        //     for (const tk of tahsilat.tahsilatKalems) {
        //         if (!tk.id) {
        //             tk.tahsilatId = tahsilat.id;
        //             await this.tahsilatKalemService.create(tk);
        //         }
        //     }
        //     if (tahsilat.durumu === TahsilatDurumu.Onaylandi) {
        //         let uniqueTahakkukIds = [...new Set(tahsilat.tahsilatKalems.map(p => p.tahakkukId))];
        //         let tahakkuks = await this.tahakkukService.findByIds(uniqueTahakkukIds);
        //         for (const tahakkuk of tahakkuks) {
        //             //cuzdan tahsilat kalemleri eskiler de geliyor. Sen hepsini create ediyon. 
        //             let kalanTutar = await this.tahakkukKalanTutarHesapla(tahakkuk, cuzdanTahsilati); //Transaction yaptiginda burasi duzeltilecek asagidaki gibi
        //             //bu tahsilattaki tutarlari bul oncekilerle topla kalan tutari sonra kontrol et
        //             if (!kalanTutar) {
        //                 await this.tahakkukService.tahakkukKapat(tahakkuk);
        //             }
        //         }
        //     }
        //     return dto.tahsilatlar;
        // }
    }

    async tahsilatiOnayla(tahsilatId: string, hesapId: string) {
        let tahsilat = await this.tahsilatService.findById(tahsilatId);
        tahsilat.durumu = TahsilatDurumu.Onaylandi;
        await this.tahsilatService.update(tahsilat.id, tahsilat);
        let hesapHareketi = new HesapHareketi(tahsilat.odemeTarihi, tahsilat.tutar, hesapId, tahsilat.id);
        await this.hesapHareketiService.create(hesapHareketi);
        let uniqueTahakkukIds = [...new Set(tahsilat.tahsilatKalems.map(p => p.tahakkukId))];
        let tahakkuks = await this.tahakkukService.findByIds(uniqueTahakkukIds);
        for (const tahakkuk of tahakkuks) {
            await this.tahakkukService.tahakkukKapat(tahakkuk);
        }
    }

    async krediKartiTahsilatiOlustur(tahakkuklarDto: Tahakkuk[], komisyon: number): Promise<TahsilatOlusturSonucuDto> {
        return this.tahsilatOlustur({ tahakkuks: tahakkuklarDto, odemeYontemi: OdemeYontemi.KrediKarti, odemeTarihi: new Date(), tutar: 0, komisyon })

        // let tahakkuklar = await this.tahakkukService.findByIds(tahakkuklarDto.map(p => p.id))
        // return await this.connection.transaction(async manager => {
        //     let tahsilat = new Tahsilat();
        //     tahsilat.aciklama = tahakkuklar.map(m => m.aciklama).join(', ') + ' Ödemesi';
        //     tahsilat.durumu = TahsilatDurumu.Bekliyor;
        //     tahsilat.guncellemeTarihi = new Date();
        //     tahsilat.guncelleyen = 'username';
        //     tahsilat.meskenKisiId = tahakkuklar[0].meskenKisiId;
        //     tahsilat.odemeTarihi = new Date();
        //     tahsilat.odemeYontemi = OdemeYontemi.KrediKarti;
        //     tahsilat.olusturan = 'username';
        //     tahsilat.olusturmaTarihi = new Date();
        //     tahsilat.tahsilatKalems = [];
        //     for (const tahakkuk of tahakkuklar) {
        //         var faizKalemi = await this.faizKalemiOlustur(tahakkuk, tahsilat.odemeTarihi, null);
        //         if (faizKalemi.tutar > 0) {
        //             tahsilat.tahsilatKalems.push(faizKalemi);
        //         }
        //         let kalanTutar = await this.tahakkukKalanTutarHesapla(tahakkuk, null);
        //         var tahakkukTahsilatKalemi = new TahsilatKalem();
        //         tahakkukTahsilatKalemi.odemeTipiId = tahakkuk.odemeTipiId;
        //         tahakkukTahsilatKalemi.tahakkukId = tahakkuk.id;
        //         tahakkukTahsilatKalemi.tutar = faizKalemi ? kalanTutar - faizKalemi.tutar : kalanTutar;
        //         tahsilat.tahsilatKalems.push(tahakkukTahsilatKalemi);
        //     }
        //     var toplamTutar = tahsilat.tahsilatKalems.map(m => m.tutar).reduce((prev, current) => prev + current, 0);
        //     var bankaKomisyonu = await this.bankaKomisyonuKalemiOlustur(toplamTutar, komisyon);
        //     tahsilat.tahsilatKalems.push(bankaKomisyonu);
        //     tahsilat.tutar = tahsilat.tahsilatKalems.map(m => m.tutar).reduce((prev, current) => prev + current, 0);
        //     await manager.save(tahsilat);
        //     for (const thk of tahsilat.tahsilatKalems) {
        //         thk.tahsilatId = tahsilat.id;
        //         await manager.save(thk);
        //     }
        //     return tahsilat;
        // });
    }
    async sanalPosLogEkle(tahsilatId: string, log: string, durum: boolean): Promise<TahsilatSanalPosLog> {
        let entity = new TahsilatSanalPosLog();
        entity.mesaj = log;
        entity.durum = durum;
        entity.tahsilatId = tahsilatId;
        await this.tahsilatSanalPosLogService.create(entity);
        return entity;
    }

}
