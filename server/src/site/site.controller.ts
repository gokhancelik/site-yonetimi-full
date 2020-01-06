import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { SiteService } from './site.service';
import { Site } from './site.entity';

@Controller('site')
export class SiteController {
    constructor(private siteService: SiteService) {
    }
    @Get()
    findAll(): Promise<Site[]> {
        return this.siteService.findAll();
    }
    @Post()
    create(@Body() site: Site): Promise<Site> {
        return this.siteService.create(site);
    }
    @Put(':id')
    update(@Param('id') id: string, @Body() site: Site) {
        return this.siteService.update(id, site);
    }
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.siteService.delete(id);
    }
}
