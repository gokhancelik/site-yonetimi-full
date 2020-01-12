import { Module } from '@nestjs/common';
import { GelirGiderTanimiController } from './gelir-gider-tanimi.controller';
import { GelirGiderTanimiService } from './gelir-gider-tanimi.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GelirGiderTanimi } from './gelir-gider-tanimi.entity';
import { GelirGiderTanimiRepository } from './gelir-gider-tanimi.repository';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [TypeOrmModule.forFeature([GelirGiderTanimi, GelirGiderTanimiRepository]), DatabaseModule],
  controllers: [GelirGiderTanimiController],
  providers: [GelirGiderTanimiService],
  exports: [GelirGiderTanimiService]
})
export class GelirGiderTanimiModule { }
