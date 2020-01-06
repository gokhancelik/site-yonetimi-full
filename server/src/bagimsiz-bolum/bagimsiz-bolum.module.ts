import { Module } from '@nestjs/common';
import { BagimsizBolumController } from './bagimsiz-bolum.controller';
import { BagimsizBolumService } from './bagimsiz-bolum.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BagimsizBolum } from './bagimsiz-bolum.entity';
import { DatabaseModule } from '../database/database.module';
import { BagimsizBolumRepository } from './bagimsiz-bolum.repository';
import { BagimsizBolumAidatGrubu } from '../aidat-grubu/bagimsiz-bolum-aidat-grubu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BagimsizBolum, BagimsizBolumRepository, BagimsizBolumAidatGrubu]), DatabaseModule],
  controllers: [BagimsizBolumController],
  providers: [BagimsizBolumService],
  exports: [BagimsizBolumService]
})
export class BagimsizBolumModule { }
