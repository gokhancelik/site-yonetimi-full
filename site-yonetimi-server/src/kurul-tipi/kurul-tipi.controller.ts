import { ApiTags } from "@nestjs/swagger";
import { Controller } from "@nestjs/common";
import { BaseController } from "src/abstract/base.controller";
import { KurulTipi } from "./kurul-tipi.entity";
import { KurulTipiService } from "./kurul-tipi.service";

@ApiTags('Kurul Tipi')
@Controller('kurul-tipi')
export class KurulTipiController extends BaseController<KurulTipi, KurulTipiService> {
    constructor(service: KurulTipiService) {
        super(service);
    }
}