export enum HesapTipi {
    Kasa = 100,
    Banka = 102
}
export interface HesapTanimi {
    id: string;
    ad: string;
    aciklama: string;
    hesapTipi: HesapTipi;
    bankaId?: string;
    hesapAdi?: string;
    subeKodu?: string;
    hesapNo?: string;
    iban?: string;
}