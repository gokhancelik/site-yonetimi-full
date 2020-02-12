export enum BorcDurumu {
    Odenmedi,
    Odendi,
    Icrada
}

export class Borc {
    id: string;
    blokId: string;
    vadeTarihi: Date;
    aciklama: string;
    tutar: number;
    odenenTutar?: number;
    durumu: BorcDurumu;
    islemTipiId: string;
};