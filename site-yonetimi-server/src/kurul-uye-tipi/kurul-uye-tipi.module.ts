

import { DatabaseModule } from "src/database/database.module";
import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { KurulUyeTipi } from "./kurul-uye-tipi.entity";
import { KurulUyeTipiRepository } from "./kurul-uye-tipi.repository";
import { KurulUyeTipiService } from "./kurul-uye-tipi.service";
import { KurulUyeTipiController } from "./kurul-uye-tipi.controller";

@Module({
    imports: [TypeOrmModule.forFeature([KurulUyeTipi, KurulUyeTipiRepository]), DatabaseModule],
    controllers: [KurulUyeTipiController],
    providers: [KurulUyeTipiService],
    exports: [KurulUyeTipiService]
  })
  export class KurulUyeTipiModule { }