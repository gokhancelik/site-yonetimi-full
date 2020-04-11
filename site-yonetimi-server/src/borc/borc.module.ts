import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { Borc } from './borc.entity';
import { BorcRepository } from './borc.repository';
import { BorcService } from './borc.service';
import { BorcController } from './borc.controller';
import { HesapHareketiModule } from '../hesap-hareketi/hesap-hareketi.module';

@Module({
  imports: [TypeOrmModule.forFeature([Borc, BorcRepository]), DatabaseModule, HesapHareketiModule],
  providers: [BorcService],
  controllers: [BorcController],
  exports: [BorcService]
})
export class BorcModule { }
