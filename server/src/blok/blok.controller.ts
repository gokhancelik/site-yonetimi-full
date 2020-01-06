import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { BlokService } from './blok.service';
import { Blok } from './blok.entity';

@Controller('blok')
export class BlokController {
    constructor(private service: BlokService) {
    }
    @Get()
    findAll(): Promise<Blok[]> {
        return this.service.findAll();
    }
    @Post()
    create(@Body() blok: Blok): Promise<Blok> {
        return this.service.create(blok);
    }
    @Put(':id')
    update(@Param('id') id: string, @Body() blok: Blok) {
        return this.service.update(id, blok);
    }
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.service.delete(id);
    }
    @Get(':siteId/bloks')
    findBySiteId(@Param('siteId') siteId: string): Promise<Blok[]> {
        return this.service.findBySiteId(siteId);
    }
}
