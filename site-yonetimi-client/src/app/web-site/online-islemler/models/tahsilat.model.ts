import { GelirGiderTanimi } from './gelir-gider-tanimi.model';
import { Tahakkuk } from './tahakkuk.model';

export enum OdemeYontemi {
    HavaleEFT = 0,
    KrediKarti = 1,
    Kasa = 3,
    Devir = 4
}
export enum TahsilatDurumu {
    Bekliyor = 0,
    Onaylandi = 1,
    Hata = 2,
    Iptal = 3
}
export interface Tahsilat {
    id: string;
    odemeTarihi: Date;
    aciklama: string;
    tutar: number;
    meskenKisiId: string;
    durumu: TahsilatDurumu;
    odemeYontemi: OdemeYontemi;
    bankaSiparisNo: string;
    tahsilatKalems?: TahsilatKalem[];
}
export interface TahsilatKalem {
    id: string;
    tutar: number;
    tahsilatId: string;
    odemeTipiId: string;
    tahakkukId: string;
    odemeTipi: GelirGiderTanimi;
    tahakkuk: Tahakkuk;
}