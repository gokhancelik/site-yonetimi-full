export enum HareketTipi {
    Gelir = 1,
    Gider = 2,
    GelirGider = 3
}
export interface GelirGiderTanimi {
    id: string;
    ad: string;
    kod: string;
    aciklama: string;
    hareketTipi: HareketTipi;
}
