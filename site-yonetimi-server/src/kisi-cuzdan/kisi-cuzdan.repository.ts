import { EntityRepository, Repository } from "typeorm";
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { KisiCuzdan } from "./kisi-cuzdan.entity";

@EntityRepository(KisiCuzdan)
export class KisiCuzdanRepository extends BaseRepository<KisiCuzdan> { }
