import { Module, FactoryProvider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { HesapHareketi } from './hesap-hareketi.entity';
import { HesapHareketiRepository } from './hesap-hareketi.repository';
import { HesapHareketiService } from './hesap-hareketi.service';
import { HesapHareketiController } from './hesap-hareketi.controller';
import { HesapHareketiUploaderService } from './hesap-hareketi-uploader/hesap-hareketi-uploader.service';
import { HesapHareketiUploaderStrategy } from './hesap-hareketi-uploader/hesap-hareketi-uploader-strategy';
import { AkbankHesapHareketiUploaderService } from './akbank/akbank-hesap-hareketi-uploader.service';
export function hesapHareketiUploaderServiceFactory(...uploaders: Array<HesapHareketiUploaderStrategy>): HesapHareketiUploaderService {
  return new HesapHareketiUploaderService(uploaders);
}

const HESAP_HAREKETI_UPLOADER_PROVIDER: FactoryProvider = {
  provide: HesapHareketiUploaderService,
  useFactory: hesapHareketiUploaderServiceFactory,
  inject: [
    AkbankHesapHareketiUploaderService
  ]
};
@Module({
  imports: [TypeOrmModule.forFeature([HesapHareketi, HesapHareketiRepository]), DatabaseModule],
  providers: [HesapHareketiService,
    AkbankHesapHareketiUploaderService,
    HESAP_HAREKETI_UPLOADER_PROVIDER],
  controllers: [HesapHareketiController],
  exports: [HesapHareketiService]
})
export class HesapHareketiModule { }
