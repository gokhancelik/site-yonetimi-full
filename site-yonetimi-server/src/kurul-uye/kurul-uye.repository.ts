import { EntityRepository, Repository } from "typeorm";
import { KurulUye } from "./kurul-uye.entity";
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(KurulUye)
export class KurulUyeRepository extends BaseRepository<KurulUye> {}
