import { Module } from '@nestjs/common';
import { MeskenTipiService } from './mesken-tipi.service';
import { MeskenTipiController } from './mesken-tipi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeskenTipi } from './mesken-tipi.entity';
import { DatabaseModule } from '../database/database.module';
import { MeskenTipiRepository } from './mesken-tipi.repository';
import { MeskenRepository } from '../mesken/mesken.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MeskenTipi, MeskenTipiRepository, MeskenRepository]), DatabaseModule],
  providers: [MeskenTipiService],
  controllers: [MeskenTipiController],
  exports: [MeskenTipiService]
})
export class MeskenTipiModule { }