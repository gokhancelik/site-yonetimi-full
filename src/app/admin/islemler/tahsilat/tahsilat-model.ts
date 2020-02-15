
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

export class TahsilatModel {
    id: string;  
    odemeTarihi: Date;  
    aciklama: string;  
    tutar: number;  
    bagimsizBolumKisiId: string;    
    durumu: TahsilatDurumu;  
    odemeYontemi: OdemeYontemi;
    bankaSiparisNo: string;
}