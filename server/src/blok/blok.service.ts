import { Injectable } from '@nestjs/common';
import { Blok } from './blok.entity';
import { DeleteResult } from 'typeorm';
import { BlokRepository } from './blok.repository';

@Injectable()
export class BlokService {
    constructor(
        private readonly repository: BlokRepository,
    ) { }

    findAll(): Promise<Blok[]> {
        return this.repository.find();
    }
    async create(site: Blok): Promise<Blok> {
        return await this.repository.save(site);
    }
    async update(id: string, site: Blok): Promise<Blok> {
        return await this.repository.save(site);
    }
    async delete(id: string): Promise<DeleteResult> {
        return await this.repository.delete(id);
    }
    async findBySiteId(siteId: string): Promise<Blok[]> {
        return this.repository.findBySiteId(siteId);
    }
}
