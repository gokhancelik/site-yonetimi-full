import { Module } from '@nestjs/common';
import { HesapTanimiController } from './hesap-tanimi.controller';
import { HesapTanimiService } from './hesap-tanimi.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HesapTanimi } from './hesap-tanimi.entity';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [TypeOrmModule.forFeature([HesapTanimi]), DatabaseModule],
  controllers: [HesapTanimiController],
  providers: [HesapTanimiService]
})
export class HesapTanimiModule {}
