import { Module } from '@nestjs/common';
import { BankaTanimController } from './banka-tanim.controller';
import { BankaTanimService } from './banka-tanim.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { BankaTanim } from './banka-tanim.entity';
import { BankaTanimRepository } from './banka-tanim.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BankaTanim, BankaTanimRepository]), DatabaseModule],
  controllers: [BankaTanimController],
  providers: [BankaTanimService]
})
export class BankaTanimModule { }
