import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { HesapHareketi } from './hesap-hareketi.entity';
import { HesapHareketiRepository } from './hesap-hareketi.repository';
import { HesapHareketiService } from './hesap-hareketi.service';
import { HesapHareketiController } from './hesap-hareketi.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HesapHareketi, HesapHareketiRepository]), DatabaseModule],
  providers: [HesapHareketiService],
  controllers: [HesapHareketiController],
  exports: [HesapHareketiService]
})
export class HesapHareketiModule { }
