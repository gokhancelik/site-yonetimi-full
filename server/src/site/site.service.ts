import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, DeleteResult } from 'typeorm';
import { Site } from './site.entity';
import { SiteRepository } from './site.repository';

@Injectable()
export class SiteService {
    constructor(
        private readonly repository: SiteRepository,
    ) { }

    findAll(): Promise<Site[]> {
        return this.repository.find();
    }
    async create(site: Site): Promise<Site> {
        return await this.repository.save(site);
    }
    async update(id: string, site: Site): Promise<Site> {
        return await this.repository.save(site);
    }
    async delete(id: string): Promise<DeleteResult> {
        return await this.repository.delete(id);
    }
}
