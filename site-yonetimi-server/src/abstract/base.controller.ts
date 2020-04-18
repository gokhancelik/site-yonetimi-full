import { Controller, Get, Post, Body, Put, Param, Delete, Patch } from '@nestjs/common';
import { BaseService } from './base.service';

export class BaseController<TEntity, TService extends BaseService<TEntity>> {
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
    create(@Body() entity: TEntity): Promise<TEntity> {
        return this.service.create(entity);
    }
    @Put(':id')
    update(@Param('id') id: string, @Body() entity: TEntity) {
        return this.service.update(id, entity);
    }
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.service.delete(id);
    }
}
