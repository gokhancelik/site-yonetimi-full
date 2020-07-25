import { EntityRepository, Repository } from "typeorm";
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Rol } from "./rol.entity";

@EntityRepository(Rol)
export class RolRepository extends BaseRepository<Rol> {}
