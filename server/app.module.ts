import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
import { DatabaseModule } from './src/database/database.module';
import { SiteModule } from './src/site/site.module';
import { BlokModule } from './src/blok/blok.module';
import { BagimsizBolumModule } from './src/bagimsiz-bolum/bagimsiz-bolum.module';
import { AidatGrubuModule } from './src/aidat-grubu/aidat-grubu.module';
import { FaizGrubuModule } from './src/faiz-grubu/faiz-grubu.module';

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
    FaizGrubuModule
  ],
  controllers: [],
  providers: []
})
export class ApplicationModule { }
