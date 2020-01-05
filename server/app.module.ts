import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
import { DatabaseModule } from './src/database/database.module';
import { SiteModule } from './src/site/site.module';
import { BlokModule } from './src/blok/blok.module';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      viewsPath: join(process.cwd(), 'dist/browser'),
      bundle: require('../server/main'),
      liveReload: true
    }),
    DatabaseModule,
    SiteModule,
    BlokModule
  ],
  controllers: [],
  providers: []
})
export class ApplicationModule { }
