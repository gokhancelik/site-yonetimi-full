import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteController } from './site.controller';
import { SiteService } from './site.service';
import { Site } from './site.entity';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [TypeOrmModule.forFeature([Site]), DatabaseModule],
  controllers: [SiteController],
  providers: [SiteService]
})
export class SiteModule { }
