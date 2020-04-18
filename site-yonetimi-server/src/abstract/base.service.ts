import { DeleteResult, Repository, ObjectLiteral } from "typeorm";
import { BaseEntity } from "./base.entity";
type NoParameterCtor<T> = { new(): T }
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
        return await this.repository.save<TEntity>(site);
    }
    async update(id: string, site: TEntity): Promise<TEntity> {
        return await this.repository.save<TEntity>(site);
    }
    async delete(id: string): Promise<DeleteResult> {
        return await this.repository.delete(id);
    }
}