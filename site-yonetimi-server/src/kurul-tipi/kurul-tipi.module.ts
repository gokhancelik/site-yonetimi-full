import { KurulTipi } from "./kurul-tipi.entity";
import { KurulTipiRepository } from "./kurul-tipi.repository";
import { DatabaseModule } from "src/database/database.module";
import { KurulTipiController } from "./kurul-tipi.controller";
import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { KurulTipiService } from "./kurul-tipi.service";

@Module({
    imports: [TypeOrmModule.forFeature([KurulTipi, KurulTipiRepository]), DatabaseModule],
    controllers: [KurulTipiController],
    providers: [KurulTipiService],
    exports: [KurulTipiService]
  })
  export class KurulTipiModule { }