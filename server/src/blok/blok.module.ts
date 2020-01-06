import { Module } from '@nestjs/common';
import { BlokService } from './blok.service';
import { BlokController } from './blok.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blok } from './blok.entity';
import { DatabaseModule } from '../database/database.module';
import { BlokRepository } from './blok.repository';
import { BagimsizBolumModule } from '../bagimsiz-bolum/bagimsiz-bolum.module';

@Module({
  imports: [TypeOrmModule.forFeature([Blok, BlokRepository]), DatabaseModule, BagimsizBolumModule],
  providers: [BlokService],
  controllers: [BlokController],
  exports: [BlokService]
})
export class BlokModule { }