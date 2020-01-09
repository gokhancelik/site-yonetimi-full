import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
import { DatabaseModule } from './src/database/database.module';
import { SiteModule } from './src/site/site.module';
import { BlokModule } from './src/blok/blok.module';
import { BagimsizBolumModule } from './src/bagimsiz-bolum/bagimsiz-bolum.module';
import { AidatGrubuModule } from './src/aidat-grubu/aidat-grubu.module';
import { FaizGrubuModule } from './src/faiz-grubu/faiz-grubu.module';
import { GelirGiderTanimiModule } from './src/gelir-gider-tanimi/gelir-gider-tanimi.module';
import { HesapTanimiModule } from './src/hesap-tanimi/hesap-tanimi.module';
import { BankaTanimModule } from './src/banka-tanim/banka-tanim.module';
import { KisiModule } from './src/kisi/kisi.module';
import { BagimsizBolumKisiModule } from './src/bagimsiz-bolum-kisi/bagimsiz-bolum-kisi.module';
import { TahakkukModule } from './src/tahakkuk/tahakkuk.module';
import { TahsilatModule } from './src/tahsilat/tahsilat.module';
import { AuthModule } from './src/auth/auth.module';
import { OnlineIslemlerModule } from './src/online-islemler/online-islemler.module';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      viewsPath: join(process.cwd(), 'dist/browser'),
      bundle: require('../server/main'),
      liveReload: true
    }),
    DatabaseModule,
    SiteModule,
    BlokModule,
    BagimsizBolumModule,
    AidatGrubuModule,
    FaizGrubuModule,
    GelirGiderTanimiModule,
    HesapTanimiModule,
    BankaTanimModule,
    KisiModule,
    BagimsizBolumKisiModule,
    TahakkukModule,
    TahsilatModule,
    AuthModule,
    OnlineIslemlerModule
  ],
  controllers: [],
  providers: []
})
export class ApplicationModule { }
