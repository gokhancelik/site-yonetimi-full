import { ApiTags } from "@nestjs/swagger";
import { Controller, Get, Param } from "@nestjs/common";
import { BaseController } from "src/abstract/base.controller";
import { FirmaService } from "./firma.service";
import { Firma } from "./firma.entity";

@ApiTags('Firma')
@Controller('firma')
export class FirmaController extends BaseController<Firma, FirmaService> {
    constructor(service: FirmaService) {
        super(service);
    }
}