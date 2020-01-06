import { EntityRepository, Repository } from 'typeorm';
import { Blok } from './blok.entity';

@EntityRepository(Blok)
export class BlokRepository extends Repository<Blok> {
    findBySiteId(siteId: string): Promise<Blok[]> {
        return this.createQueryBuilder('site')
            .where('site.id = :id', { id: siteId })
            .getMany();
    }
}
