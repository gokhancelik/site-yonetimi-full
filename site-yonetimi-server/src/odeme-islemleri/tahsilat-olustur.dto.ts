import { Tahakkuk } from "../tahakkuk/tahakkuk.entity";
import { OdemeYontemi } from "../tahsilat/tahsilat.entity";
import { KisiCuzdan } from "../kisi-cuzdan/kisi-cuzdan.entity";

export class TahsilatOlusturDto {
    tahakkuks: Tahakkuk[];
    tutar: number;
    odemeTarihi: Date;
    odemeYontemi: OdemeYontemi;
}