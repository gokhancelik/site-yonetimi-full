import { EntityRepository, Repository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Firma } from './firma.entity';

@EntityRepository(Firma)
export class FirmaRepository extends BaseRepository<Firma> {}
