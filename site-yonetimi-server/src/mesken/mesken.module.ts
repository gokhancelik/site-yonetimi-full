import { Module } from '@nestjs/common';
import { MeskenService } from './mesken.service';
import { MeskenController } from './mesken.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mesken } from './mesken.entity';
import { DatabaseModule } from '../database/database.module';
import { MeskenRepository } from './mesken.repository';
import { MeskenKisiModule } from '../mesken-kisi/mesken-kisi.module';

@Module({
  imports: [TypeOrmModule.forFeature([Mesken, MeskenRepository]), DatabaseModule, MeskenKisiModule],
  providers: [MeskenService],
  controllers: [MeskenController],
  exports: [MeskenService]
})
export class MeskenModule { }