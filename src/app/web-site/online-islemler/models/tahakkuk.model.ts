export enum AidatDurumu {
    Odenmedi,
    Odendi,
    Icrada
}
export class Tahakkuk {
    id: string;
    vadeTarihi: Date;
    aciklama: string;
    tutar: number;
    faizOrani: number;
    odemeTipiId: string;
    bagimsizBolumKisiId: string;
    durumu: AidatDurumu;
}