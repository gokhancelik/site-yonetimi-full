import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { BagimsizBolumModule } from '../bagimsiz-bolum/bagimsiz-bolum.module';
import { Borc } from './borc.entity';
import { BorcRepository } from './borc.repository';
import { BorcService } from './borc.service';
import { BorcController } from './borc.controller';
import { BlokModule } from '../blok/blok.module';

@Module({
  imports: [TypeOrmModule.forFeature([Borc, BorcRepository]), DatabaseModule, BlokModule],
  providers: [BorcService],
  controllers: [BorcController],
  exports: [BorcService]
})
export class BorcModule { }
