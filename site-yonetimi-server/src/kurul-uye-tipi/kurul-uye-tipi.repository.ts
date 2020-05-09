import { EntityRepository, Repository } from "typeorm";
import { KurulUyeTipi } from "./kurul-uye-tipi.entity";

@EntityRepository(KurulUyeTipi)
export class KurulUyeTipiRepository extends Repository<KurulUyeTipi> {}
