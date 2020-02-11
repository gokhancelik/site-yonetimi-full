import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { BagimsizBolumModule } from '../bagimsiz-bolum/bagimsiz-bolum.module';
import { BlokModule } from '../blok/blok.module';
import { HesapHareketi } from './hesap-hareketi.entity';
import { HesapHareketiRepository } from './hesap-hareketi.repository';
import { HesapHareketiService } from './hesap-hareketi.service';
import { HesapHareketiController } from './hesap-hareketi.controller';
import { BorcModule } from '../borc/borc.module';
import { TahsilatModule } from '../tahsilat/tahsilat.module';
import { GelirGiderTanimiModule } from '../gelir-gider-tanimi/gelir-gider-tanimi.module';

@Module({
  imports: [TypeOrmModule.forFeature([HesapHareketi, HesapHareketiRepository]), DatabaseModule, 
    BorcModule, 
    TahsilatModule, 
    GelirGiderTanimiModule],
  providers: [HesapHareketiService],
  controllers: [HesapHareketiController],
  exports: [HesapHareketiService]
})
export class HesapHareketiModule { }
