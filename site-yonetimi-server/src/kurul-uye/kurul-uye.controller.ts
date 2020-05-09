import { ApiTags } from "@nestjs/swagger";
import { Controller } from "@nestjs/common";
import { BaseController } from "src/abstract/base.controller";
import { KurulUyeService } from "./kurul-uye.service";
import { KurulUye } from "./kurul-uye.entity";

@ApiTags('Kurul Uye')
@Controller('kurul-uye')
export class KurulUyeController extends BaseController<KurulUye, KurulUyeService> {
    constructor(service: KurulUyeService) {
        super(service);
    }
}