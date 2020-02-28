import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { TahsilatKalem } from './tahsilat-kalem.entity';
import { TahsilatKalemRepository } from './tahsilat-kalem.repository';
import { TahsilatKalemService } from './tahsilat-kalem.service';
import { TahsilatKalemController } from './tahsilat-kalem.controller';
import { GelirGiderTanimi } from '../gelir-gider-tanimi/gelir-gider-tanimi.entity';
import { Tahakkuk } from '../tahakkuk/tahakkuk.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GelirGiderTanimi, Tahakkuk, TahsilatKalem, TahsilatKalemRepository]), DatabaseModule],
  controllers: [TahsilatKalemController],
  providers: [TahsilatKalemService],
  exports: [TahsilatKalemService]
})
export class TahsilatKalemModule { }
