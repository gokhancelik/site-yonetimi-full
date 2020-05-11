import { Module } from '@nestjs/common';
import { KisiCuzdanGecmisService } from './kisi-cuzdan-gecmis.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KisiCuzdan } from './kisi-cuzdan.entity';
import { KisiCuzdanRepository } from './kisi-cuzdan.repository';
import { DatabaseModule } from '../database/database.module';
import { KisiCuzdanGecmis } from './kisi-cuzdan-gecmis';
import { KisiCuzdanGecmisRepository } from './kisi-cuzdan-gecmis.repository';

@Module({
  imports: [TypeOrmModule.forFeature([KisiCuzdan, KisiCuzdanRepository, KisiCuzdanGecmis, KisiCuzdanGecmisRepository]), DatabaseModule],
  providers: [KisiCuzdanGecmisService],
  exports: [KisiCuzdanGecmisService]
})
export class KisiCuzdanModule { }
