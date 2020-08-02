import { Module } from '@nestjs/common';
import { MeskenKisiController } from './mesken-kisi.controller';
import { MeskenKisiService } from './mesken-kisi.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeskenKisi } from './mesken-kisi.entity';
import { DatabaseModule } from '../database/database.module';
import { KisiCuzdanModule } from '../kisi-cuzdan/kisi-cuzdan.module';
import { TahakkukModule } from '../tahakkuk/tahakkuk.module';

@Module({
  imports: [TypeOrmModule.forFeature([MeskenKisi]), DatabaseModule, KisiCuzdanModule],
  controllers: [MeskenKisiController],
  providers: [MeskenKisiService],
  exports: [MeskenKisiService]
})
export class MeskenKisiModule { }
