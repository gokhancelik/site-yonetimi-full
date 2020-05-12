import { Module } from '@nestjs/common';
import { KisiController } from './kisi.controller';
import { KisiService } from './kisi.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kisi } from './kisi.entity';
import { DatabaseModule } from '../database/database.module';
import { MeskenKisiModule } from '../mesken-kisi/mesken-kisi.module';
import { TahsilatModule } from '../tahsilat/tahsilat.module';
import { TahakkukModule } from '../tahakkuk/tahakkuk.module';
import { KisiCuzdanModule } from '../kisi-cuzdan/kisi-cuzdan.module';

@Module({
  imports: [TypeOrmModule.forFeature([Kisi]), DatabaseModule, MeskenKisiModule, TahsilatModule, TahakkukModule, KisiCuzdanModule],
  controllers: [KisiController],
  providers: [KisiService],
  exports: [KisiService]
})
export class KisiModule { }
