import { Module } from '@nestjs/common';
import { TahsilatService } from './tahsilat.service';
import { TahsilatController } from './tahsilat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tahsilat } from './tahsilat.entity';
import { DatabaseModule } from '../database/database.module';
import { GelirGiderTanimiModule } from '../gelir-gider-tanimi/gelir-gider-tanimi.module';
import { TahsilatKalemModule } from '../tahsilat-kalem/tahsilat-kalem.module';
import { TahakkukModule } from '../tahakkuk/tahakkuk.module';
import { TahsilatSanalPosLog } from './tahsilat-sanal-pos-log.entity';
import { TahsilatSanalPosLogRepository } from './tahsilat-sanal-pos-log.repository';
import { TahsilatSanalPosLogService } from './tahsilat-sanal-pos-log.service';
import { HesapHareketiModule } from '../hesap-hareketi/hesap-hareketi.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tahsilat, TahsilatSanalPosLog]),
    TahsilatSanalPosLogRepository,
    DatabaseModule,
    GelirGiderTanimiModule,
    HesapHareketiModule,
    TahakkukModule,
    TahsilatKalemModule],
  providers: [TahsilatService, TahsilatSanalPosLogService],
  controllers: [TahsilatController],
  exports: [TahsilatService, TahsilatSanalPosLogService,TahsilatSanalPosLogRepository]
})
export class TahsilatModule { }
