import { Tahakkuk } from "../tahakkuk/tahakkuk.entity";
import { OdemeYontemi } from "../tahsilat/tahsilat.entity";
import { KisiCuzdan } from "../kisi-cuzdan/kisi-cuzdan.entity";
import { SanalPos } from "../sanal-pos/sanal-pos.entity";

export class TahsilatOlusturDto {
    tahakkuks: Tahakkuk[];
    tutar: number;
    odemeTarihi: Date;
    odemeYontemi: OdemeYontemi;
    sanalPos: SanalPos;
}