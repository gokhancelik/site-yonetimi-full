import { Injectable, Inject } from '@nestjs/common';
import { HesapHareketi } from '../hesap-hareketi.entity';
import { HesapHareketiExcel } from '../dtos/hesap-hareketi-excel.dto';
import { HesapHareketiUploaderStrategy } from './hesap-hareketi-uploader-strategy';

@Injectable()
export class HesapHareketiUploaderService {
    constructor(@Inject(HesapHareketiUploaderStrategy) private strategies: Array<HesapHareketiUploaderStrategy>) {
    }
    mapFromExcel(from: ArrayBuffer, bankName: string): Promise<HesapHareketi[]> {
        return this.strategies.find(p => p.bankName === bankName).mapFromExcel(from);
    }
    save(data: HesapHareketi[], bankName: string): Promise<HesapHareketi[]> {
        return this.strategies.find(p => p.bankName === bankName).save(data);
    }
}
