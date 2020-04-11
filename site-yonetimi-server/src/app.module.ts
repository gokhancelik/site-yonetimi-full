import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { SiteModule } from './site/site.module';
import { BlokModule } from './blok/blok.module';
import { BorcModule } from './borc/borc.module';
import { BagimsizBolumModule } from './bagimsiz-bolum/bagimsiz-bolum.module';
import { AidatGrubuModule } from './aidat-grubu/aidat-grubu.module';
import { FaizGrubuModule } from './faiz-grubu/faiz-grubu.module';
import { GelirGiderTanimiModule } from './gelir-gider-tanimi/gelir-gider-tanimi.module';
import { HesapHareketiModule } from './hesap-hareketi/hesap-hareketi.module';
import { HesapTanimiModule } from './hesap-tanimi/hesap-tanimi.module';
import { BankaTanimModule } from './banka-tanim/banka-tanim.module';
import { KisiModule } from './kisi/kisi.module';
import { BagimsizBolumKisiModule } from './bagimsiz-bolum-kisi/bagimsiz-bolum-kisi.module';
import { TahakkukModule } from './tahakkuk/tahakkuk.module';
import { TahsilatModule } from './tahsilat/tahsilat.module';
import { AuthModule } from './auth/auth.module';
import { OnlineIslemlerModule } from './online-islemler/online-islemler.module';

@Module({
  imports: [ DatabaseModule,
    SiteModule,
    BlokModule,
    BorcModule,
    BagimsizBolumModule,
    AidatGrubuModule,
    FaizGrubuModule,
    GelirGiderTanimiModule,
    HesapHareketiModule,
    HesapTanimiModule,
    BankaTanimModule,
    KisiModule,
    BagimsizBolumKisiModule,
    TahakkukModule,
    TahsilatModule,
    AuthModule,
    OnlineIslemlerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
