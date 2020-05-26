import { EntityRepository, Repository } from "typeorm";
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Duyurular } from "./duyurular.entity";

@EntityRepository(Duyurular)
export class DuyurularRepository extends BaseRepository<Duyurular> {}
