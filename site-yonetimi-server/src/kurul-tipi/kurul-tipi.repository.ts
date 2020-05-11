import { EntityRepository, Repository } from "typeorm";
import { KurulTipi } from "./kurul-tipi.entity";
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(KurulTipi)
export class KurulTipiRepository extends BaseRepository<KurulTipi> {}
