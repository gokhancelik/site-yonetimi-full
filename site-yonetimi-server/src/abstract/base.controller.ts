import { Controller, Get, Post, Body, Put, Param, Delete, Request } from '@nestjs/common';
import { BaseService } from './base.service';
import { BaseEntity } from './base.entity';

export class BaseController<TEntity extends BaseEntity, TService extends BaseService<TEntity>> {
    constructor(protected service: TService) {
    }
    @Get(':id')
    findById(@Param('id') id: string): Promise<TEntity> {
        return this.service.findById(id);
    }
    @Get()
    findAll(): Promise<TEntity[]> {
        return this.service.findAll();
    }
    @Post()
    create(@Body() entity: TEntity, @Request() request): Promise<TEntity> {
        entity.olusturan = request.user ? request.user.id : 'anonymous';
        entity.guncelleyen = request.user ? request.user.id : 'anonymous';
        return this.service.create(entity);
    }
    @Put(':id')
    update(@Param('id') id: string, @Body() entity: TEntity, @Request() request) {
        entity.guncelleyen = request.user ? request.user.id : 'anonymous';
        return this.service.update(id, entity);
    }
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.service.delete(id);
    }
}
