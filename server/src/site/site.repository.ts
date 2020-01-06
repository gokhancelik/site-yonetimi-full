import { EntityRepository, Repository } from 'typeorm';
import { Site } from './site.entity';

@EntityRepository()
export class SiteRepository extends Repository<Site> {

}