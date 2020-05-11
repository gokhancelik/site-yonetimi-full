import { EntityRepository, Repository } from "typeorm";
import { KurulUyeTipi } from "./kurul-uye-tipi.entity";
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(KurulUyeTipi)
export class KurulUyeTipiRepository extends BaseRepository<KurulUyeTipi> {}
