import { GelirGiderTanimi } from './gelir-gider-tanimi.model';
import { BagimsizBolumKisi } from '../../../admin/tanimlamalar/bagimsiz-bolum-kisi/bagimsiz-bolum-kisi.model';

export enum AidatDurumu {
    Odenmedi,
    Odendi,
    Icrada
}
export interface Tahakkuk {
    sonTahsilatTarihi: Date;
    aciklama: string;
    tutar: number;
    odenenTutar: number;
    faizOrani: number;
    odemeTipiId: string;
    bagimsizBolumKisiId: string;
    durumu: AidatDurumu;
    kalanTutar: number;
    faiz: number;
    odemeTipi: GelirGiderTanimi;
    id: string;
    vadeTarihi: Date;
    odemeTarihi?: Date;
    bagimsizBolumKisi: BagimsizBolumKisi;
    odenecekTutar: number;
    bankaKomisyonu: number;
}
