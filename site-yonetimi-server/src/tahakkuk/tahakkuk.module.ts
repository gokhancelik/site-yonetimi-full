import { Module } from '@nestjs/common';
import { TahakkukService } from './tahakkuk.service';
import { TahakkukController } from './tahakkuk.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { GelirGiderTanimiModule } from '../gelir-gider-tanimi/gelir-gider-tanimi.module';
import { HesapHareketiModule } from '../hesap-hareketi/hesap-hareketi.module';
import { MeskenModule } from 'src/mesken/mesken.module';
import { BorcModule } from 'src/borc/borc.module';
import { FaizGrubuModule } from 'src/faiz-grubu/faiz-grubu.module';
import { TahakkukRepository } from './tahakkuk.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TahakkukRepository]), HesapHareketiModule, MeskenModule, BorcModule, FaizGrubuModule, DatabaseModule, GelirGiderTanimiModule],
  providers: [TahakkukService],
  controllers: [TahakkukController],
  exports: [TahakkukService]
})
export class TahakkukModule { }
