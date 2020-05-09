

import { DatabaseModule } from "src/database/database.module";

import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { KurulUye } from "./kurul-uye.entity";
import { KurulUyeRepository } from "./kurul-uye.repository";
import { KurulUyeController } from "./kurul-uye.controller";
import { KurulUyeService } from "./kurul-uye.service";


@Module({
    imports: [TypeOrmModule.forFeature([KurulUye, KurulUyeRepository]), DatabaseModule],
    controllers: [KurulUyeController],
    providers: [KurulUyeService],
    exports: [KurulUyeService]
  })
  export class KurulUyeModule { }