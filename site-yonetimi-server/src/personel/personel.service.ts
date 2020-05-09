import { PersonelRepository } from "./personel.repository";
import { BaseService } from "src/abstract/base.service";
import { Personel } from "./personel.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PersonelService extends BaseService<Personel>{
    constructor(repository: PersonelRepository) {
        super(repository);
    }
}
