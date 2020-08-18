import { Module } from '@nestjs/common';
import { OdemeIslemleriService } from './odeme-islemleri.service';
import { TahsilatModule } from '../tahsilat/tahsilat.module';
import { TahakkukModule } from '../tahakkuk/tahakkuk.module';
import { TahsilatKalemModule } from '../tahsilat-kalem/tahsilat-kalem.module';
import { HesapHareketiModule } from '../hesap-hareketi/hesap-hareketi.module';
import { GelirGiderTanimiModule } from '../gelir-gider-tanimi/gelir-gider-tanimi.module';
import { OdemeIslemleriController } from './odeme-islemleri.controller';
import { KisiCuzdanModule } from '../kisi-cuzdan/kisi-cuzdan.module';
import { MeskenKisiModule } from '../mesken-kisi/mesken-kisi.module';
import { HesapTanimiModule } from '../hesap-tanimi/hesap-tanimi.module';
import { SanalPosModule } from '../sanal-pos/sanal-pos.module';
import { SmsGatewayModule } from '../sms-gateway/sms-gateway.module';

@Module({
  imports: [
    TahsilatModule,
    TahakkukModule,
    TahsilatKalemModule,
    HesapHareketiModule,
    GelirGiderTanimiModule,
    KisiCuzdanModule,
    MeskenKisiModule,
    HesapTanimiModule,
    SmsGatewayModule
  ],
  providers: [OdemeIslemleriService],
  controllers: [OdemeIslemleriController],
  exports: [OdemeIslemleriService]
})
export class OdemeIslemleriModule { }
