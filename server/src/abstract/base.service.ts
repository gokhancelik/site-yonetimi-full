import { DeleteResult, Repository } from "typeorm";

export abstract class BaseService<TEntity> {
    constructor(public repository: Repository<TEntity>) {

    }
    findAll(): Promise<TEntity[]> {
        return this.repository.find();
    }
    findById(id: string): Promise<TEntity> {
        return this.repository.findOne(id);
    }
    async create(site: TEntity): Promise<TEntity> {
        return await this.repository.save(site);
    }
    async update(id: string, site: TEntity): Promise<TEntity> {
        return await this.repository.save(site);
    }
    async delete(id: string): Promise<DeleteResult> {
        return await this.repository.delete(id);
    }
}