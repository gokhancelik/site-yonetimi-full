import { Tahsilat } from "../tahsilat/tahsilat.entity";
import { KisiCuzdan } from "../kisi-cuzdan/kisi-cuzdan.entity";

export class TahsilatOlusturSonucuDto {
    tahsilatlar: Tahsilat[];
    cuzdan: KisiCuzdan;
    hesapId?: string;
    hesapHareketiId: string;
}