import { HesapHareketiExcel } from "../dtos/hesap-hareketi-excel.dto";

export class AkbankHesapHareketiExcel extends HesapHareketiExcel {
    /**
     *
     */
    constructor() {
        super();
    }
}
export class AkbankHesapHareketi {
    tarih: string;
    saat: string;
    tutar: string;
    bakiye: number;
    aciklama: string;
    dekontNo: string;
}