import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { BorcModule } from './borc/borc.module';
import { AidatGrubuModule } from './aidat-grubu/aidat-grubu.module';
import { FaizGrubuModule } from './faiz-grubu/faiz-grubu.module';
import { GelirGiderTanimiModule } from './gelir-gider-tanimi/gelir-gider-tanimi.module';
import { HesapHareketiModule } from './hesap-hareketi/hesap-hareketi.module';
import { HesapTanimiModule } from './hesap-tanimi/hesap-tanimi.module';
import { BankaTanimModule } from './banka-tanim/banka-tanim.module';
import { KisiModule } from './kisi/kisi.module';
import { TahakkukModule } from './tahakkuk/tahakkuk.module';
import { TahsilatModule } from './tahsilat/tahsilat.module';
import { AuthModule } from './auth/auth.module';
import { OnlineIslemlerModule } from './online-islemler/online-islemler.module';
import { SanalPosModule } from './sanal-pos/sanal-pos.module';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';
import { MeskenKisiModule } from './mesken-kisi/mesken-kisi.module';
import { MeskenTipiModule } from './mesken-tipi/mesken-tipi.module';
import { MeskenModule } from './mesken/mesken.module';
import { PersonelModule } from './personel/personel.module';
import { KurulTipiModule } from './kurul-tipi/kurul-tipi.module';
import { KurulUyeModule } from './kurul-uye/kurul-uye.module';
@Module({
  imports: [DatabaseModule,
    BorcModule,
    AidatGrubuModule,
    FaizGrubuModule,
    GelirGiderTanimiModule,
    HesapHareketiModule,
    HesapTanimiModule,
    BankaTanimModule,
    KisiModule,
    MeskenKisiModule,
    TahakkukModule,
    TahsilatModule,
    AuthModule,
    OnlineIslemlerModule,
    SanalPosModule,
    MeskenTipiModule,
    MeskenModule,
    TerminusModule,
    PersonelModule,
    KurulTipiModule,
    KurulUyeModule
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule { }
