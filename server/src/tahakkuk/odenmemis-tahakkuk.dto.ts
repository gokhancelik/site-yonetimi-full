import { GelirGiderTanimi } from "../gelir-gider-tanimi/gelir-gider-tanimi.entity";
import { BagimsizBolumKisi } from "../bagimsiz-bolum-kisi/bagimsiz-bolum-kisi.entity";
import { AidatDurumu } from "./tahakkuk.entity";
import { TahakkukTahsilat } from "../tahsilat/tahakkuk-tahsilat.entity";

export class OdenmemisTahakkuk {
    id: string;
    vadeTarihi: Date;
    aciklama: string;
    bagimsizBolumKisiId!: string;
    tutar: number;
    odenenTutar?: number;
    sonTahsilatTarihi?: Date;
    faizOrani: number;
    bankaKomisyonOrani: number;
    odemeTipiId: string;
    odemeTipi!: GelirGiderTanimi;
    durumu: AidatDurumu;
    kalanTutar: number;
    faiz: number;
    public get odenecekTutar(): number {
        return this.tutar - this.odenenTutar + this.faiz
    }
    public get bankaKomisyonu(): number {
        return this.bankaKomisyonOrani * this.odenecekTutar;
    }
    public faizHesapla(odemeTarihi: Date = null): number {
        if (!odemeTarihi) {
            odemeTarihi = new Date();
        }
        if (this.durumu == AidatDurumu.Icrada)
            return 0;
        var tarih = this.vadeTarihi;
        if (this.sonTahsilatTarihi && this.sonTahsilatTarihi > this.vadeTarihi) {
            tarih = this.sonTahsilatTarihi;
        }
        var gunSayisi = ((odemeTarihi.getTime() - tarih.getTime()) / (1000 * 3600 * 24));
        var ay = (gunSayisi / 30);
        var faiz = (this.tutar - this.odenenTutar) * this.faizOrani * (ay > 0 ? ay : 0);
        if (faiz > 0)
            return faiz;
        return 0;
    }
}