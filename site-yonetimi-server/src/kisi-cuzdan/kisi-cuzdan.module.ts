import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KisiCuzdan } from './kisi-cuzdan.entity';
import { KisiCuzdanRepository } from './kisi-cuzdan.repository';
import { DatabaseModule } from '../database/database.module';
import { KisiCuzdanService } from './kisi-cuzdan.service';

@Module({
  imports: [TypeOrmModule.forFeature([KisiCuzdan, KisiCuzdanRepository]), DatabaseModule],
  providers: [KisiCuzdanService],
  exports: [KisiCuzdanService]
})
export class KisiCuzdanModule { }
