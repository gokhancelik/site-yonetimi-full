import { Module } from '@nestjs/common';
import { TahsilatService } from './tahsilat.service';
import { TahsilatController } from './tahsilat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tahsilat } from './tahsilat.entity';
import { DatabaseModule } from '../database/database.module';
import { TahsilatKalem } from './tahsilat-kalem.entity';
import { TahakkukTahsilat } from './tahakkuk-tahsilat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tahsilat, TahsilatKalem, TahakkukTahsilat]), DatabaseModule],
  providers: [TahsilatService],
  controllers: [TahsilatController],
  exports: [TahsilatService]
})
export class TahsilatModule { }
