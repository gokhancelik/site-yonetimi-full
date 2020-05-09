
import { Personel } from "./personel.entity";
import { PersonelRepository } from "./personel.repository";
import { DatabaseModule } from "src/database/database.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PersonelController } from "./personel.controller";
import { PersonelService } from "./personel.service";

@Module({
  imports: [TypeOrmModule.forFeature([Personel, PersonelRepository]), DatabaseModule],
  controllers: [PersonelController],
  providers: [PersonelService],
  exports: [PersonelService]
})
export class PersonelModule { }