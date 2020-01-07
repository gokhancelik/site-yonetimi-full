import { Module } from '@nestjs/common';
import { TahakkukService } from './tahakkuk.service';
import { TahakkukController } from './tahakkuk.controller';
import { Tahakkuk } from './tahakkuk.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tahakkuk]), DatabaseModule],
  providers: [TahakkukService],
  controllers: [TahakkukController]
})
export class TahakkukModule {}
