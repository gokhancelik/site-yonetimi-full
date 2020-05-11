import { Module } from '@nestjs/common';
import { OdemeIslemleriService } from './odeme-islemleri.service';
import { TahsilatModule } from '../tahsilat/tahsilat.module';
import { TahakkukModule } from '../tahakkuk/tahakkuk.module';
import { TahsilatKalemModule } from '../tahsilat-kalem/tahsilat-kalem.module';
import { HesapHareketiModule } from '../hesap-hareketi/hesap-hareketi.module';
import { GelirGiderTanimiModule } from '../gelir-gider-tanimi/gelir-gider-tanimi.module';
import { OdemeIslemleriController } from './odeme-islemleri.controller';

@Module({
  imports: [
    TahsilatModule,
    TahakkukModule,
    TahsilatKalemModule,
    HesapHareketiModule,
    GelirGiderTanimiModule,
  ],
  providers: [OdemeIslemleriService],
  controllers: [OdemeIslemleriController],
  exports: [OdemeIslemleriService]
})
export class OdemeIslemleriModule { }
