import { ApiTags } from "@nestjs/swagger";
import { Controller } from "@nestjs/common";
import { BaseController } from "src/abstract/base.controller";
import { KurulUyeTipi } from "./kurul-uye-tipi.entity";
import { KurulUyeTipiService } from "./kurul-uye-tipi.service";


@ApiTags('Kurul Uye Tipi')
@Controller('kurul-uye-tipi')
export class KurulUyeTipiController extends BaseController<KurulUyeTipi, KurulUyeTipiService> {
    constructor(service: KurulUyeTipiService) {
        super(service);
    }
}