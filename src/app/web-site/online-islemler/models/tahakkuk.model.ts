import { GelirGiderTanimi } from './gelir-gider-tanimi.model';

export enum AidatDurumu {
    Odenmedi,
    Odendi,
    Icrada
}
export interface Tahakkuk {
    id: string;
    vadeTarihi: Date;
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
}
