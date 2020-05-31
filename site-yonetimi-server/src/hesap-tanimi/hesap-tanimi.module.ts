import { Module } from '@nestjs/common';
import { HesapTanimiController } from './hesap-tanimi.controller';
import { HesapTanimiService } from './hesap-tanimi.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HesapTanimi } from './hesap-tanimi.entity';
import { DatabaseModule } from '../database/database.module';
import { HesapTanimiRepository } from './hesap-tanimi.repository';
import { HesapHareketiModule } from '../hesap-hareketi/hesap-hareketi.module';

@Module({
  imports: [TypeOrmModule.forFeature([HesapTanimiRepository]), DatabaseModule, HesapHareketiModule],
  controllers: [HesapTanimiController],
  providers: [HesapTanimiService],
  exports: [HesapTanimiService]
})
export class HesapTanimiModule { }
