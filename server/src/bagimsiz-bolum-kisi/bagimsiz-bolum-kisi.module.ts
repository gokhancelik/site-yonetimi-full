import { Module } from '@nestjs/common';
import { BagimsizBolumKisiController } from './bagimsiz-bolum-kisi.controller';
import { BagimsizBolumKisiService } from './bagimsiz-bolum-kisi.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BagimsizBolumKisi } from './bagimsiz-bolum-kisi.entity';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [TypeOrmModule.forFeature([BagimsizBolumKisi]), DatabaseModule],
  controllers: [BagimsizBolumKisiController],
  providers: [BagimsizBolumKisiService]
})
export class BagimsizBolumKisiModule {}
