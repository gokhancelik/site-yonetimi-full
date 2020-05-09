import { EntityRepository, Repository } from "typeorm";
import { KurulUye } from "./kurul-uye.entity";


@EntityRepository(KurulUye)
export class KurulUyeRepository extends Repository<KurulUye> {}
