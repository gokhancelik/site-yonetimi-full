
import { DatabaseModule } from "src/database/database.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DuyurularService } from "./duyurular.service";
import { DuyurularController } from "./duyurular.controller";
import { Module } from '@nestjs/common';
import { Duyurular } from "./duyurular.entity";
import { DuyurularRepository } from "./duyurular.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Duyurular, DuyurularRepository]), DatabaseModule],
    controllers: [DuyurularController],
    providers: [DuyurularService],
    exports: [DuyurularService]
  })
  export class DuyurularModule { }