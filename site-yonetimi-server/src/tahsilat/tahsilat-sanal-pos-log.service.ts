import { TahsilatSanalPosLog } from "./tahsilat-sanal-pos-log.entity";
import { BaseService } from "../abstract/base.service";
import { Injectable } from "@nestjs/common";
import { TahsilatSanalPosLogRepository } from "./tahsilat-sanal-pos-log.repository";

@Injectable()
export class TahsilatSanalPosLogService extends BaseService<TahsilatSanalPosLog>{
    constructor(repository: TahsilatSanalPosLogRepository) {
        super(repository);
    }
}