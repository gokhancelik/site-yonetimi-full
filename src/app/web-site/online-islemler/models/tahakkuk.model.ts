export enum AidatDurumu {
    Odenmedi,
    Odendi,
    Icrada
}
export class Tahakkuk {
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
    deserialize(input: Object): Tahakkuk {
        Object.keys(input).forEach(key => {
            this[key] = input[key];
        });
        return this;
    }
}