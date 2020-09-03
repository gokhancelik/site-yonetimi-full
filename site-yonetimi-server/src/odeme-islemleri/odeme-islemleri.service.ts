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
import { LessThanOrEqual, In, LessThan } from 'typeorm';
import { TahsilatSanalPosLog } from '../tahsilat/tahsilat-sanal-pos-log.entity';
import { TahsilatSanalPosLogService } from '../tahsilat/tahsilat-sanal-pos-log.service';
import { KisiCuzdan } from '../kisi-cuzdan/kisi-cuzdan.entity';
import { TahsilatOlusturDto } from './tahsilat-olustur.dto';
import { KisiCuzdanService } from '../kisi-cuzdan/kisi-cuzdan.service';
import { MeskenKisiService } from '../mesken-kisi/mesken-kisi.service';
import { TahsilatOlusturSonucuDto } from './tahsilat-olustur-sonucu.dto';
import { OdemeAktarimi } from './odeme-aktarimi.entity';
import { MeskenKisi } from '../mesken-kisi/mesken-kisi.entity';
import { HesapTanimiService } from '../hesap-tanimi/hesap-tanimi.service';
import { SanalPos } from '../sanal-pos/sanal-pos.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NetgsmSmsGatewayService } from '../sms-gateway/netgsm-sms-gateway.service';

@Injectable()
export class OdemeIslemleriService {

    constructor(
        // private readonly connection: Connection,
        private readonly smsService: NetgsmSmsGatewayService,
        private tahakkukService: TahakkukService,
        private kisiCuzdanService: KisiCuzdanService,
        private tahsilatKalemService: TahsilatKalemService,
        private meskenKisiService: MeskenKisiService,
        // private hesapHareketiService: HesapHareketiService,
        private tahsilatService: TahsilatService,
        private tahsilatSanalPosLogService: TahsilatSanalPosLogService,
        private hesapTanimiService: HesapTanimiService,
        private gelirGiderTanimiService: GelirGiderTanimiService) {
    }
    async odemeleriDagit() {
        const sanalPos = await SanalPos.findOne({ where: { aktifMi: true } });
        const butunOdemeler = await OdemeAktarimi.createQueryBuilder()
            .where('ROUND(odenenTutar,3) > ROUND(islenenTutar,3) and odenenTutar > 0 and bagimsizBolumKod is not null and odemeSekli <> \'İade\'')
            .orderBy('odemeTarihi', 'ASC')
            .getMany();
        const uniqueBagimsizBolumKods = [...new Set(butunOdemeler.map(p => p.bagimsizBolumKod))];
        for (const bagimsizBolumKod of uniqueBagimsizBolumKods) {
            const odemeler = butunOdemeler.filter(p => p.bagimsizBolumKod === bagimsizBolumKod);
            const aktarim = this.aktarimYap(odemeler, bagimsizBolumKod, sanalPos);
            // if (!islemler[chunk] || islemler[chunk].length >= 10) {
            //     chunk++;
            //     islemler[chunk] = [];
            // }
            // islemler[chunk].push(aktarim);
            await aktarim;
        }
        // for (const islem of islemler) {
        //     await Promise.all(islem);
        // }
    }
    private async aktarimYap(odemeler: OdemeAktarimi[], bagimsizBolumKod: string, sanalPos: SanalPos): Promise<void> {
        const meskenKisi: MeskenKisi = await this.meskenKisiService.getByMeskenKod(bagimsizBolumKod);
        for (const odeme of odemeler) {
            //odenmemis tahakkuklari getir.
            const tahakkuklar = await this.tahakkukService.getOdenmemisAidatlar(meskenKisi.kisiId);
            const odemeYontemi = this.getOdemeYontemiFromOdeme(odeme);
            const hesapTanim = await this.hesapTanimiService.findByAktarimId(odeme.bankaKodu);
            if (tahakkuklar.length) {
                const tahsilat = await this.tahsilatOlustur({
                    tahakkuks: tahakkuklar,
                    tutar: odeme.kalanTutar,
                    odemeTarihi: odeme.odemeTarihi,
                    odemeYontemi: odemeYontemi,
                    sanalPos: sanalPos
                });
                tahsilat.hesapId = hesapTanim.id;
                await this.tahsilatKaydet(tahsilat, TahsilatDurumu.Onaylandi);
            } else {
                const tahsilat = await this.tahakkuksuzTahsilatOlustur(meskenKisi.id, odeme.odemeTarihi, odemeYontemi, odeme.kalanTutar, sanalPos, odeme.odemeTipi);
                tahsilat.save();
                // let hesapHareketi = await HesapHareketi.olustur(tahsilat.odemeTarihi, tahsilat.tutar, hesapTanim.id, tahsilat.id);
                // let oncekiCuzdan = await this.kisiCuzdanService.getCuzdanByMeskenKisiId(meskenKisi.id);
                // let toplamTutar = oncekiCuzdan ? oncekiCuzdan.tutar + tahsilat.kullanilabilirMiktar : tahsilat.kullanilabilirMiktar;
                await this.kisiCuzdanService.createByMeskenKisiId(tahsilat.kullanilabilirMiktar, tahsilat.id, meskenKisi.id);
            }
            odeme.islenenTutar += odeme.kalanTutar;
            odeme.save();
        }
    }

    private getOdemeYontemiFromOdeme(odeme: OdemeAktarimi) {
        return odeme.bankaKodu === '08' ? OdemeYontemi.KrediKarti : odeme.bankaKodu === 'DEVİR' ? OdemeYontemi.Devir : OdemeYontemi.HavaleEFT;
    }

    async tahakkukKalanTutarHesapla(tahakkuk: Tahakkuk): Promise<number> {
        return tahakkuk.kalanAnaPara;
    }
    async tahakkuksuzTahsilatOlustur(meskenKisiId: string, odemeTarihi: Date, odemeYontemi: OdemeYontemi, tutar: number, sanalPos: SanalPos, odemeTipiKod: string) {
        const tahsilat = new Tahsilat();
        tahsilat.durumu = TahsilatDurumu.Onaylandi;
        tahsilat.meskenKisi = await this.meskenKisiService.findById(meskenKisiId);
        tahsilat.odemeTarihi = new Date(odemeTarihi);
        tahsilat.odemeYontemi = odemeYontemi;
        tahsilat.tahsilatKalems = [];
        tahsilat.tutar = tutar;
        tahsilat.kullanilanTutar = 0;
        if (odemeYontemi === OdemeYontemi.KrediKarti && sanalPos) {
            const komisyonKalemi = await this.bankaKomisyonuKalemiOlustur(tahsilat.tutar, sanalPos);
            tahsilat.tahsilatKalems.push(komisyonKalemi);
            tahsilat.kullanilanTutar += komisyonKalemi.tutar;
        }
        const tahsilatKalem = new TahsilatKalem();
        tahsilatKalem.tutar = tahsilat.kullanilabilirMiktar;
        tahsilatKalem.odemeTipiId = (await this.gelirGiderTanimiService.getByKod(odemeTipiKod)).id;
        tahsilat.tahsilatKalems.push(tahsilatKalem);
        tahsilat.aciklama = 'Tahakkuksuz Ödeme';
        for (const thk of tahsilat.tahsilatKalems) {
            thk.tahsilatId = tahsilat.id;
        }
        return tahsilat;
    }
    async faizKalemiOlustur(tahakkuk: Tahakkuk, odemeTarihi: Date) {
        tahakkuk.odemeTarihi = odemeTarihi;
        const tahsilatKalem = new TahsilatKalem();
        tahsilatKalem.tahakkukId = tahakkuk.id;
        tahsilatKalem.tahakkuk = tahakkuk;
        tahsilatKalem.tutar = tahakkuk.faiz;
        const gelirTanimi = await this.gelirGiderTanimiService.getByKod(GelirGiderTanimi.Faiz);
        tahsilatKalem.odemeTipiId = gelirTanimi.id;
        tahsilatKalem.odemeTipi = gelirTanimi;
        return tahsilatKalem;
    }
    async bankaKomisyonuKalemiOlustur(tutar, sanalPos: SanalPos) {
        const tahsilatKalem = new TahsilatKalem();
        tahsilatKalem.tutar = Number((tutar * sanalPos.komisyon).toFixed(2));
        const gelirTanimi = await this.gelirGiderTanimiService.getByKod(GelirGiderTanimi.BankaKomisyonu);
        tahsilatKalem.odemeTipiId = gelirTanimi.id;
        tahsilatKalem.odemeTipi = gelirTanimi;
        return tahsilatKalem;
    }
    async tahsilatOlustur(dto: TahsilatOlusturDto): Promise<TahsilatOlusturSonucuDto> {
        await this.cuzdanVarsaOdemeYap(dto.tahakkuks[0].meskenKisiId);
        const sonuc = new TahsilatOlusturSonucuDto();
        const tahakkuklar = (await this.tahakkukService.findByIds(dto.tahakkuks.map(p => p.id))).filter(p => p.durumu === AidatDurumu.Odenmedi);
        const tutar = dto.tutar;
        const odemeTarihi = new Date(dto.odemeTarihi);
        const odemeYontemi = dto.odemeYontemi;
        if (tahakkuklar.length) {
            if (!tutar) {
                sonuc.tahsilat = await this.tahakkuktanTahsilatOlustur(tahakkuklar, odemeTarihi, odemeYontemi, dto.sanalPos);
            }
            else {
                const tahsilat = await this.tahakkukVeTutardanTahsilatOlustur(tahakkuklar, tutar, odemeTarihi, odemeYontemi, dto.sanalPos);
                if (Number(tahsilat.kullanilabilirMiktar.toFixed(2)) > 0) {
                    sonuc.cuzdan = new KisiCuzdan();
                    sonuc.cuzdan.tutar = tahsilat.kullanilabilirMiktar;
                    sonuc.cuzdan.tahsilatId = tahsilat.id;
                    sonuc.cuzdan.aktifMi = true;
                }
                sonuc.tahsilat = tahsilat;
            }
        }
        return sonuc;
    }

    async cuzdanVarsaOdemeYap(meskenKisiId: string) {
        const cuzdanlar = await this.kisiCuzdanService.getCuzdanByMeskenKisiId(meskenKisiId);
        if (cuzdanlar && cuzdanlar.length) {
            for (const cuzdan of cuzdanlar) {
                await this.cuzdandanOde(cuzdan);
            }
        }
    }

    async cuzdandanOde(cuzdan: KisiCuzdan) {
        const tahsilat = cuzdan.tahsilat;
        const meskenKisi: MeskenKisi = await this.meskenKisiService.findById(cuzdan.tahsilat.meskenKisiId);
        const tahakkuklar = await this.tahakkukService.getOdenmemisAidatlar(meskenKisi.kisiId);
        for (const tahakkuk of tahakkuklar) {
            const faizKalemi = await this.faizKalemiOlustur(tahakkuk, tahsilat.odemeTarihi);
            if (faizKalemi.tutar > 0) {
                if (faizKalemi.tutar >= tahsilat.kullanilabilirMiktar) {
                    faizKalemi.tutar = tahsilat.kullanilabilirMiktar;
                    tahsilat.kullanilanTutar += faizKalemi.tutar;
                    tahsilat.tahsilatKalems.push(faizKalemi);
                    cuzdan.aktifMi = false;
                    await cuzdan.save();
                    break;
                } else {
                    tahsilat.kullanilanTutar += faizKalemi.tutar;
                    tahsilat.tahsilatKalems.push(faizKalemi);
                }
            }
            const gecerliTahakkukKalanTutar = await this.tahakkukKalanTutarHesapla(tahakkuk);
            if (tahsilat.kullanilabilirMiktar >= gecerliTahakkukKalanTutar) {
                const tahakkukTahsilatKalemi = new TahsilatKalem();
                tahakkukTahsilatKalemi.odemeTipiId = tahakkuk.odemeTipiId;
                tahakkukTahsilatKalemi.odemeTipi = tahakkuk.odemeTipi;
                tahakkukTahsilatKalemi.tahakkukId = tahakkuk.id;
                tahakkukTahsilatKalemi.tahakkuk = tahakkuk;
                tahakkukTahsilatKalemi.tutar = gecerliTahakkukKalanTutar;
                tahsilat.tahsilatKalems.push(tahakkukTahsilatKalemi);
                tahsilat.kullanilanTutar += tahakkukTahsilatKalemi.tutar;
                tahakkuk.durumu = AidatDurumu.Odendi;
                await tahakkuk.save();
            } else {
                const tahakkukTahsilatKalemi = new TahsilatKalem();
                tahakkukTahsilatKalemi.odemeTipiId = tahakkuk.odemeTipiId;
                tahakkukTahsilatKalemi.odemeTipi = tahakkuk.odemeTipi;
                tahakkukTahsilatKalemi.tahakkukId = tahakkuk.id;
                tahakkukTahsilatKalemi.tahakkuk = tahakkuk;
                tahakkukTahsilatKalemi.tutar = tahsilat.kullanilabilirMiktar;
                tahsilat.tahsilatKalems.push(tahakkukTahsilatKalemi);
                tahsilat.kullanilanTutar += tahakkukTahsilatKalemi.tutar;
                cuzdan.aktifMi = false;
                await cuzdan.save();
                break;
            }
        }
        await tahsilat.save();
        for (const thk of tahsilat.tahsilatKalems) {
            thk.tahsilatId = tahsilat.id;
            await thk.save();
        }
    }
    async tahakkukVeTutardanTahsilatOlustur(tahakkuklar: Tahakkuk[], tutar: number, odemeTarihi: Date, odemeYontemi: OdemeYontemi, sanalPos: SanalPos): Promise<Tahsilat> {
        const tahsilat = new Tahsilat();
        tahsilat.durumu = TahsilatDurumu.Bekliyor;
        tahsilat.guncelleyen = 'username';
        tahsilat.meskenKisiId = tahakkuklar[0].meskenKisiId;
        tahsilat.meskenKisi = tahakkuklar[0].meskenKisi ?? await this.meskenKisiService.findById(tahakkuklar[0].meskenKisiId);
        tahsilat.odemeTarihi = new Date(odemeTarihi);
        tahsilat.odemeYontemi = odemeYontemi;
        tahsilat.olusturan = 'username';
        tahsilat.tahsilatKalems = [];
        tahsilat.tutar = tutar;
        tahsilat.kullanilanTutar = 0;
        const aciklama = [];
        if (odemeYontemi === OdemeYontemi.KrediKarti && sanalPos) {
            const komisyonKalemi = await this.bankaKomisyonuKalemiOlustur(tahsilat.tutar, sanalPos);
            tahsilat.tahsilatKalems.push(komisyonKalemi);
            tahsilat.kullanilanTutar += komisyonKalemi.tutar;
        }
        for (const tahakkuk of tahakkuklar) {
            const faizKalemi = await this.faizKalemiOlustur(tahakkuk, tahsilat.odemeTarihi);
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
            const gecerliTahakkukKalanTutar = await this.tahakkukKalanTutarHesapla(tahakkuk);
            if (tahsilat.kullanilabilirMiktar >= gecerliTahakkukKalanTutar) {
                const tahakkukTahsilatKalemi = new TahsilatKalem();
                tahakkukTahsilatKalemi.odemeTipiId = tahakkuk.odemeTipiId;
                tahakkukTahsilatKalemi.odemeTipi = tahakkuk.odemeTipi;
                tahakkukTahsilatKalemi.tahakkukId = tahakkuk.id;
                tahakkukTahsilatKalemi.tahakkuk = tahakkuk;
                tahakkukTahsilatKalemi.tutar = gecerliTahakkukKalanTutar;
                tahsilat.tahsilatKalems.push(tahakkukTahsilatKalemi);
                tahsilat.kullanilanTutar += tahakkukTahsilatKalemi.tutar;
                aciklama.push(tahakkuk.aciklama);
            } else {
                const tahakkukTahsilatKalemi = new TahsilatKalem();
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
    async tahakkuktanTahsilatOlustur(tahakkuklar: Tahakkuk[], odemeTarihi: Date, odemeYontemi: OdemeYontemi, sanalPos: SanalPos) {
        const tahsilat = new Tahsilat();
        tahsilat.durumu = TahsilatDurumu.Bekliyor;
        tahsilat.guncelleyen = 'username';
        tahsilat.meskenKisiId = tahakkuklar[0].meskenKisiId;
        tahsilat.odemeTarihi = new Date(odemeTarihi);
        tahsilat.odemeYontemi = odemeYontemi;
        tahsilat.olusturan = 'username';
        tahsilat.tahsilatKalems = [];
        const aciklama = [];
        for (const tahakkuk of tahakkuklar) {
            const faizKalemi = await this.faizKalemiOlustur(tahakkuk, tahsilat.odemeTarihi);
            if (faizKalemi.tutar > 0) {
                tahsilat.tahsilatKalems.push(faizKalemi);
            }
            const kalanTutar = await this.tahakkukKalanTutarHesapla(tahakkuk);
            const tahakkukTahsilatKalemi = new TahsilatKalem();
            tahakkukTahsilatKalemi.odemeTipiId = tahakkuk.odemeTipiId;
            tahakkukTahsilatKalemi.odemeTipi = tahakkuk.odemeTipi;
            tahakkukTahsilatKalemi.tahakkukId = tahakkuk.id;
            tahakkukTahsilatKalemi.tahakkuk = tahakkuk;
            tahakkukTahsilatKalemi.tutar = kalanTutar;
            tahsilat.tahsilatKalems.push(tahakkukTahsilatKalemi);
            aciklama.push(tahakkuk.aciklama);
        }
        const toplamTutar = tahsilat.tahsilatKalems.map(m => m.tutar).reduce((prev, current) => prev + current, 0);
        tahsilat.tutar = toplamTutar;
        if (odemeYontemi === OdemeYontemi.KrediKarti && sanalPos) {
            const komisyonKalemi = await this.bankaKomisyonuKalemiOlustur(tahsilat.tutar, sanalPos);
            tahsilat.tahsilatKalems.push(komisyonKalemi);
            tahsilat.tutar = tahsilat.tahsilatKalems.map(m => m.tutar).reduce((prev, current) => prev + current, 0);
            tahsilat.sanalPos = sanalPos;
            tahsilat.sanalPosId = sanalPos.id;
        }
        tahsilat.kullanilanTutar = tahsilat.tutar;
        tahsilat.aciklama = aciklama.join(', ') + ' Ödemesi';
        for (const thk of tahsilat.tahsilatKalems) {
            thk.tahsilatId = tahsilat.id;
        }
        return tahsilat;
    }
    async tahsilatKaydet(dto: TahsilatOlusturSonucuDto, tahsilatDurumu = TahsilatDurumu.Onaylandi): Promise<Tahsilat> {

        if (dto.tahsilat) {
            dto.tahsilat.durumu = tahsilatDurumu;

            await this.tahsilatService.create(dto.tahsilat);
            for (const tk of dto.tahsilat.tahsilatKalems) {
                tk.tahsilatId = dto.tahsilat.id;
                await this.tahsilatKalemService.create(tk);
            }
            if (dto.tahsilat.durumu === TahsilatDurumu.Onaylandi) {
                const hesapHareketi = await HesapHareketi.findOne(dto.hesapHareketiId);
                if (hesapHareketi) {
                    hesapHareketi.tahsilatId = dto.tahsilat.id;
                    hesapHareketi.save();
                }
                const uniqueTahakkukIds = [...new Set(dto.tahsilat.tahsilatKalems.map(p => p.tahakkukId))];
                const tahakkuks = await this.tahakkukService.findByIds(uniqueTahakkukIds);
                for (const tahakkuk of tahakkuks) {
                    const kalanTutar = await this.tahakkukKalanTutarHesapla(tahakkuk); //Transaction yaptiginda burasi duzeltilecek asagidaki gibi
                    if (kalanTutar <= 0) {
                        await this.tahakkukService.tahakkukKapat(tahakkuk);
                    }
                }
            }

        }
        if (dto.cuzdan) {
            dto.cuzdan.tahsilatId = dto.tahsilat.id;
            await this.kisiCuzdanService.createByMeskenKisiId(dto.cuzdan.tutar, dto.tahsilat.id, dto.tahsilat.meskenKisiId);
        }
        return dto.tahsilat;
    }

    async tahsilatiOnayla(tahsilatId: string, hesapId: string, hesapHareketiOlustur = true) {
        const tahsilat = await this.tahsilatService.findById(tahsilatId);
        tahsilat.durumu = TahsilatDurumu.Onaylandi;
        await this.tahsilatService.update(tahsilat.id, tahsilat);
        if (hesapHareketiOlustur) {
            await HesapHareketi.olustur(tahsilat.odemeTarihi, tahsilat.tutar, hesapId, tahsilat.id);
        }
        const uniqueTahakkukIds = [...new Set(tahsilat.tahsilatKalems.map(p => p.tahakkukId))];
        const tahakkuks = await this.tahakkukService.findByIds(uniqueTahakkukIds);
        for (const tahakkuk of tahakkuks) {
            await this.tahakkukService.tahakkukKapat(tahakkuk);
        }
    }

    async krediKartiTahsilatiOlustur(tahakkuklarDto: Tahakkuk[], sanalPos: SanalPos): Promise<TahsilatOlusturSonucuDto> {
        return this.tahsilatOlustur({ tahakkuks: tahakkuklarDto, odemeYontemi: OdemeYontemi.KrediKarti, odemeTarihi: new Date(), tutar: 0, sanalPos })
    }
    async sanalPosLogEkle(tahsilatId: string, log: string, durum: boolean): Promise<TahsilatSanalPosLog> {
        const entity = new TahsilatSanalPosLog();
        entity.mesaj = log;
        entity.durum = durum;
        entity.tahsilatId = tahsilatId;
        await this.tahsilatSanalPosLogService.create(entity);
        return entity;
    }
    // @Cron(CronExpression.EVERY_10_SECONDS)
    @Cron('0 30 16 19 * *')
    async borclularaMesajAt() {
        const today = new Date();
        const ikiAyOncesi = new Date();
        ikiAyOncesi.setMonth(ikiAyOncesi.getMonth() - 2);
        const borclular = await Tahakkuk.find({
            join: {
                alias: 'th',
                innerJoinAndSelect: {
                    meskenKisi: 'th.meskenKisi',
                    mesken: 'meskenKisi.mesken',
                    blok: 'mesken.ust',
                    kisi: 'meskenKisi.kisi',
                }
            },
            where: qb => {
                qb.where({ // Filter Role fields
                    durumu: AidatDurumu.Odenmedi,
                    vadeTarihi: LessThanOrEqual(ikiAyOncesi),
                })
                    .andWhere('blok.kod in (\'B208\',\'AK10\',\'AK11\',\'CK02\',\'Y101\')')
            }
        });
        const kisiler = [...new Set(borclular.map(p => p.meskenKisiId))];
        for (const meskenKisiId of kisiler) {
            const meskenKisi = await MeskenKisi.findOne({
                join: {
                    alias: 'meskenKisi',
                    innerJoinAndSelect: {
                        kisi: 'meskenKisi.kisi',
                        mesken: 'meskenKisi.mesken'
                    }
                },
                where: {
                    id: meskenKisiId
                }
            });
            const kisininBorclari = await this.tahakkukService.getOdenmemisAidatlar((meskenKisi).kisiId);
            const { ad, soyad, cepTelefon } = meskenKisi.kisi;
            const { kod } = meskenKisi.mesken;
            if (cepTelefon.length === 10) {
                const tahsilat = await this.tahsilatOlustur({ odemeTarihi: new Date(), odemeYontemi: OdemeYontemi.HavaleEFT, tutar: 0, tahakkuks: kisininBorclari, sanalPos: null })
                const mesaj = `SAYIN ${ad} ${soyad} (${kod}), ${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()} TARİHİ İTİBARİ İLE ${(tahsilat).tahsilat.tutar.toFixed(2)} TL BORCUNUZ BULUNMAKTADIR. https://cigdemadasi.turkuazvadisi.com ADRESİNDEN ÖDEME YAPABİLİRSİNİZ. \n TURKUAZ VADİSİ ÇİĞDEM ADASI.`
                await this.smsService.send('90' + cepTelefon, mesaj).toPromise();
            }
        }
    }
    @Cron(CronExpression.EVERY_HOUR)
    async bekleyenTahsilatlariSil() {
        const today = new Date();
        today.setHours(today.getHours() - 1);
        const tahsilatlar = await Tahsilat.find({
            where: {
                durumu: TahsilatDurumu.Bekliyor,
                olusturmaTarihi: LessThan(today)
            }
        });
        if (tahsilatlar.length) {
            await TahsilatKalem.delete({
                tahsilatId: In(tahsilatlar.map(m => m.id))
            });
            await TahsilatSanalPosLog.delete({
                tahsilatId: In(tahsilatlar.map(m => m.id)),
                aktarildiMi: false
            });
            await Tahsilat.delete({
                durumu: TahsilatDurumu.Bekliyor,
                olusturmaTarihi: LessThan(today),
            });
        }

    }
}
