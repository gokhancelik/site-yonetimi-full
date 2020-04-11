import { EntityRepository, Repository } from 'typeorm';
import { Site } from './site.entity';

@EntityRepository(Site)
export class SiteRepository extends Repository<Site> {

}