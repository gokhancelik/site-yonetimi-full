import { GelirGiderTanimi } from './gelir-gider-tanimi.model';
import { MeskenKisi } from '../../../admin/tanimlamalar/mesken-kisi/mesken-kisi.model';
import { TahsilatKalem } from './tahsilat.model';

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
    meskenKisiId: string;
    durumu: AidatDurumu;
    kalanTutar: number;
    faiz: number;
    odemeTipi: GelirGiderTanimi;
    id: string;
    vadeTarihi: Date;
    odemeTarihi?: Date;
    meskenKisi: MeskenKisi;
    odenecekTutar: number;
    bankaKomisyonu: number;
    tahsilatKalems: TahsilatKalem[];
}
