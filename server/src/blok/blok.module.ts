import { Module } from '@nestjs/common';
import { BlokService } from './blok.service';
import { BlokController } from './blok.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blok } from './blok.entity';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [TypeOrmModule.forFeature([Blok]), DatabaseModule],
  providers: [BlokService],
  controllers: [BlokController]
})
export class BlokModule { }
