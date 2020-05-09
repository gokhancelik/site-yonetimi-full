import { BaseController } from "src/abstract/base.controller";
import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Personel } from "./personel.entity";
import { PersonelService } from "./personel.service";


@ApiTags('Personel')
@Controller('personel')
export class PersonelController extends BaseController<Personel, PersonelService> {
    constructor(service: PersonelService) {
        super(service);
    }
    
}