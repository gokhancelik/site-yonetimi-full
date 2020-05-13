import { Module } from '@nestjs/common';
import { FaizGrubuController } from './faiz-grubu.controller';
import { FaizGrubuService } from './faiz-grubu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FaizGrubu } from './faiz-grubu.entity';
import { FaizGrubuRepository } from './faiz-grubu.repository';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [TypeOrmModule.forFeature([FaizGrubu, FaizGrubuRepository]), DatabaseModule],
  controllers: [FaizGrubuController],
  providers: [FaizGrubuService],
  exports: [FaizGrubuService]
})
export class FaizGrubuModule {}
