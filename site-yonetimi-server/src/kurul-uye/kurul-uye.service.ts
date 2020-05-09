import { Injectable } from "@nestjs/common";
import { BaseService } from "src/abstract/base.service";
import { KurulUye } from "./kurul-uye.entity";
import { KurulUyeRepository } from "./kurul-uye.repository";


@Injectable()
export class KurulUyeService extends BaseService<KurulUye>{

    constructor(repository: KurulUyeRepository) {
        super(repository);
    }
}
