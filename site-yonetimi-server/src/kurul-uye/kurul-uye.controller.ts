import { ApiTags } from "@nestjs/swagger";
import { Controller, Get, Param } from "@nestjs/common";
import { BaseController } from "src/abstract/base.controller";
import { KurulUyeService } from "./kurul-uye.service";
import { KurulUye } from "./kurul-uye.entity";

@ApiTags('Kurul Uye')
@Controller('kurul-uye')
export class KurulUyeController extends BaseController<KurulUye, KurulUyeService> {
    constructor(service: KurulUyeService) {
        super(service);
    }
    @Get(':id/kisis')
    getByKisiId(@Param('id') id: string): Promise<KurulUye[]> {
        return this.service.getByKisiId(id);
    }
    @Get(':id/meskens')
    getByMeskenId(@Param('id') id: string): Promise<KurulUye[]> {
        return this.service.getByMeskenId(id);
    }
}