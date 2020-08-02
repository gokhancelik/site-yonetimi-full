import { HesapHareketiExcel } from "../dtos/hesap-hareketi-excel.dto";
import { HesapHareketi } from "../hesap-hareketi.entity";

/**
 * Class HesapHareketiUploaderStrategy
 *
 * Base class for hesap hareketi strategy used in hesap hareketi uploader service
 */
export abstract class HesapHareketiUploaderStrategy {
    bankName: string;
    public abstract mapFromExcel(from: ArrayBuffer): Promise<HesapHareketi[]>;
    public abstract save(data: HesapHareketi[]): Promise<HesapHareketi[]>;
}