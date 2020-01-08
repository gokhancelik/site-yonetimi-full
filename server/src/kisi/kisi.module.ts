import { Module } from '@nestjs/common';
import { KisiController } from './kisi.controller';
import { KisiService } from './kisi.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kisi } from './kisi.entity';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [TypeOrmModule.forFeature([Kisi]), DatabaseModule],
  controllers: [KisiController],
  providers: [KisiService],
  exports: [KisiService]
})
export class KisiModule { }
