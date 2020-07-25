import { EntityRepository, Repository } from "typeorm";
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { KisiRol } from "./kisi-rol.entity";

@EntityRepository(KisiRol)
export class KisiRolRepository extends BaseRepository<KisiRol> {}
