import { Module } from '@nestjs/common';
import { TahsilatService } from './tahsilat.service';
import { TahsilatController } from './tahsilat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tahsilat } from './tahsilat.entity';
import { DatabaseModule } from '../database/database.module';
import { GelirGiderTanimiModule } from '../gelir-gider-tanimi/gelir-gider-tanimi.module';
import { TahsilatKalemModule } from '../tahsilat-kalem/tahsilat-kalem.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tahsilat]), DatabaseModule, GelirGiderTanimiModule,
    TahsilatKalemModule],
  providers: [TahsilatService],
  controllers: [TahsilatController],
  exports: [TahsilatService]
})
export class TahsilatModule { }
