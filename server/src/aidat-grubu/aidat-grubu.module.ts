import { Module } from '@nestjs/common';
import { AidatGrubuController } from './aidat-grubu.controller';
import { AidatGrubuService } from './aidat-grubu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AidatGrubu } from './aidat-grubu.entity';
import { AidatGrubuRepository } from './aidat-grubu.repository';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [TypeOrmModule.forFeature([AidatGrubu, AidatGrubuRepository]), DatabaseModule],
  controllers: [AidatGrubuController],
  providers: [AidatGrubuService]
})
export class AidatGrubuModule { }
