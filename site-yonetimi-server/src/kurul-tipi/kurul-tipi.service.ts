import { Injectable } from "@nestjs/common";
import { BaseService } from "src/abstract/base.service";
import { KurulTipi } from "./kurul-tipi.entity";
import { KurulTipiRepository } from "./kurul-tipi.repository";

@Injectable()
export class KurulTipiService extends BaseService<KurulTipi>{

    constructor(repository: KurulTipiRepository) {
        super(repository);
    }
}
