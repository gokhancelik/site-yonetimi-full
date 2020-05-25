import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { FirmaService } from './firma.service';
import { Firma } from './firma.entity';
import { FirmaController } from './firma.controller';
import { BorcModule } from 'src/borc/borc.module';

@Module({
  imports: [TypeOrmModule.forFeature([Firma]), DatabaseModule],
  controllers: [FirmaController],
  providers: [FirmaService],
  exports: [FirmaService]
})
export class FirmaModule { }
