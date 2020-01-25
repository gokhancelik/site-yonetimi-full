import { Kisi } from '../kisi/kisi.model';
import { BagimsizBolum } from '../bagimsiz-bolum/bagimsiz-bolum.model';


export class BagimsizBolumKisi {
    id: string;
    bagimsizBolumId?: string;
    kisiId: string;
    baslangicTarihi?: Date;
    bitisTarihi?: Date;
    bagimsizBolum?: BagimsizBolum;
    kisi?: Kisi;
}