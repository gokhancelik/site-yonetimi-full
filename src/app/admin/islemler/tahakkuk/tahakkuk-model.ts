export enum AidatDurumu {
    Odenmedi,
    Odendi,
    Icrada
}

export class TahakkukModel {
    id: string;
    vadeTarihi: Date;
    aciklama: string;
    tutar: number;
    odenenTutar?: number;
    sonTahsilatTarihi?: Date;
    faizOrani: number;
    odemeTipiId: string;
    bagimsizBolumKisiId: string;
    durumu: AidatDurumu;
}