import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { BaseService } from './base.service';

export class BaseController<TEntity, TService extends BaseService<TEntity>> {
    constructor(protected service: TService) {
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
    update(@Param('id') id: any, @Body() entity: TEntity) {
        return this.service.update(id, entity);
    }
    @Delete(':id')
    delete(@Param('id') id: any) {
        return this.service.delete(id);
    }
}
