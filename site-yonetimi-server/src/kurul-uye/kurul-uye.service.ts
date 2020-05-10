import { Injectable } from "@nestjs/common";
import { BaseService } from "src/abstract/base.service";
import { KurulUye } from "./kurul-uye.entity";
import { KurulUyeRepository } from "./kurul-uye.repository";


@Injectable()
export class KurulUyeService extends BaseService<KurulUye>{

    constructor(repository: KurulUyeRepository) {
        super(repository);
    }
    async getByKisiId(kisiId: string): Promise<KurulUye[]> {
        return this.repository.createQueryBuilder('ku')
            .innerJoinAndSelect('ku.kisi', 'k')
            .where('k.id = :kisiId', { kisiId: kisiId })
            .getMany();
    }
    async getByMeskenId(meskenId: string): Promise<KurulUye[]> {
        return this.repository.createQueryBuilder('ku')
            .innerJoinAndSelect('ku.mesken', 'm')
            .where('m.id = :meskenId', { meskenId: meskenId })
            .getMany();
    }
}
