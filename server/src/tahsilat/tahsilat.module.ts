import { Module } from '@nestjs/common';
import { TahsilatService } from './tahsilat.service';
import { TahsilatController } from './tahsilat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tahsilat } from './tahsilat.entity';
import { DatabaseModule } from '../database/database.module';
import { TahsilatKalem } from './tahsilat-kalem.entity';
import { TahakkukTahsilat } from './tahakkuk-tahsilat.entity';
import { GelirGiderTanimiModule } from '../gelir-gider-tanimi/gelir-gider-tanimi.module';
import { TahakkukModule } from '../tahakkuk/tahakkuk.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tahsilat, TahsilatKalem, TahakkukTahsilat]), DatabaseModule, GelirGiderTanimiModule, TahakkukModule],
  providers: [TahsilatService],
  controllers: [TahsilatController],
  exports: [TahsilatService]
})
export class TahsilatModule { }
