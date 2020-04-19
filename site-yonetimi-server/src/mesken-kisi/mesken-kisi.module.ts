import { Module } from '@nestjs/common';
import { MeskenKisiController } from './mesken-kisi.controller';
import { MeskenKisiService } from './mesken-kisi.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeskenKisi } from './mesken-kisi.entity';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [TypeOrmModule.forFeature([MeskenKisi]), DatabaseModule],
  controllers: [MeskenKisiController],
  providers: [MeskenKisiService],
  exports: [MeskenKisiService]
})
export class MeskenKisiModule { }
