import { Injectable } from '@nestjs/common';
import { HesapHareketi } from '../hesap-hareketi.entity';
import { AkbankHesapHareketiExcel, AkbankHesapHareketi } from './akbank-hesap-hareketi.dto';
import { HesapTanimi } from '../../hesap-tanimi/hesap-tanimi.entity';
import { HesapHareketiUploaderStrategy } from '../hesap-hareketi-uploader/hesap-hareketi-uploader-strategy';
import xlsx from 'node-xlsx';
import { HesapHareketiService } from '../hesap-hareketi.service';

@Injectable()
export class AkbankHesapHareketiUploaderService extends HesapHareketiUploaderStrategy {
    /**
     *
     */
    constructor(private hesapHareketiService: HesapHareketiService) {
        super();
        this.bankName = 'akbank';
    }
    async mapFromExcel(file: ArrayBuffer): Promise<HesapHareketi[]> {
        const workSheetsFromBuffer = xlsx.parse(file);
        let from = new AkbankHesapHareketiExcel();
        from.iban = 'TR840004601250888000007811';
        let sheet1 = workSheetsFromBuffer[0];
        for (let i = 1; i < sheet1.data.length; i++) {
            let row = sheet1.data[i] as any;
            let hesapHareketi = new AkbankHesapHareketi();
            if (row.length === 6) {
                hesapHareketi.tarih = row[0];
                hesapHareketi.saat = row[1];
                hesapHareketi.tutar = row[2];
                hesapHareketi.bakiye = row[3];
                hesapHareketi.aciklama = row[4];
                hesapHareketi.dekontNo = row[5];
                from.hesapHareketleri.push(hesapHareketi);
            }
        }
        if (from) {
            let hesaptanimi = await HesapTanimi.findOne({
                where: {
                    iban: from.iban
                }
            });
            let result = (<AkbankHesapHareketi[]>from.hesapHareketleri).map((ha) => {
                let tarihParts = ha.tarih.split('.');
                let saatParts = ha.saat.split(':');
                let islemTarihi = new Date(Number(tarihParts[2]), Number(tarihParts[1]) - 1, Number(tarihParts[0]), Number(saatParts[0]), Number(saatParts[1]));
                return new HesapHareketi(islemTarihi, Number(ha.tutar), hesaptanimi.id, null, null, ha.aciklama, ha.dekontNo);
            });
            return result;
        }
        return null;
    }
    async save(data: HesapHareketi[]): Promise<HesapHareketi[]> {
        return this.hesapHareketiService.aktarim(data);
    }

}
