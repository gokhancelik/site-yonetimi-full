import { Injectable } from "@nestjs/common";
import { BaseService } from "src/abstract/base.service";
import { DuyurularRepository } from "./duyurular.repository";
import { Duyurular } from "./duyurular.entity";


@Injectable()
export class DuyurularService extends BaseService<Duyurular>{
    constructor(repository: DuyurularRepository) {
        super(repository);
    }
}
