import { Module } from '@nestjs/common';
import { TahakkukService } from './tahakkuk.service';
import { TahakkukController } from './tahakkuk.controller';
import { Tahakkuk } from './tahakkuk.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { GelirGiderTanimiModule } from '../gelir-gider-tanimi/gelir-gider-tanimi.module';
import { HesapHareketiModule } from '../hesap-hareketi/hesap-hareketi.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tahakkuk]), HesapHareketiModule, DatabaseModule, GelirGiderTanimiModule],
  providers: [TahakkukService],
  controllers: [TahakkukController],
  exports: [TahakkukService]
})
export class TahakkukModule { }
