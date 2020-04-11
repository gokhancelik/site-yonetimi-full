import { EntityRepository, Repository } from 'typeorm';
import { Blok } from './blok.entity';

@EntityRepository(Blok)
export class BlokRepository extends Repository<Blok> {
    findBySiteId(siteId: string): Promise<Blok[]> {
        return this.createQueryBuilder('blok')
            .where('blok.siteId = :siteId', { siteId: siteId })
            .getMany();
    }
}
