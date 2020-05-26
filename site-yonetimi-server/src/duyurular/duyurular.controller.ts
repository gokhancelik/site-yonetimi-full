import { ApiTags } from "@nestjs/swagger";
import { Controller, Get, Param } from "@nestjs/common";
import { BaseController } from "src/abstract/base.controller";
import { Duyurular } from "./duyurular.entity";
import { DuyurularService } from "./duyurular.service";

@ApiTags('Duyurular')
@Controller('duyurular')
export class DuyurularController extends BaseController<Duyurular, DuyurularService> {
    constructor(service: DuyurularService) {
        super(service);
    }
}