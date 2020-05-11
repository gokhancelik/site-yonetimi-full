import { EntityRepository, Repository } from "typeorm";
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { KisiCuzdanGecmis } from "./kisi-cuzdan-gecmis";

@EntityRepository(KisiCuzdanGecmis)
export class KisiCuzdanGecmisRepository extends BaseRepository<KisiCuzdanGecmis> { }
