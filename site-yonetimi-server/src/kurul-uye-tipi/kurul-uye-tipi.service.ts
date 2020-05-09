import { Injectable } from "@nestjs/common";
import { BaseService } from "src/abstract/base.service";
import { KurulUyeTipi } from "./kurul-uye-tipi.entity";
import { KurulUyeTipiRepository } from "./kurul-uye-tipi.repository";


@Injectable()
export class KurulUyeTipiService extends BaseService<KurulUyeTipi>{

    constructor(repository: KurulUyeTipiRepository) {
        super(repository);
    }
}