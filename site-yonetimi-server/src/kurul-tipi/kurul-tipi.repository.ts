import { EntityRepository, Repository } from "typeorm";
import { KurulTipi } from "./kurul-tipi.entity";

@EntityRepository(KurulTipi)
export class KurulTipiRepository extends Repository<KurulTipi> {}
