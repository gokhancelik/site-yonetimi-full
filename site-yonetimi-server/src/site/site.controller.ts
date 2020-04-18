import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { SiteService } from './site.service';
import { Site } from './site.entity';
import { BaseController } from '../abstract/base.controller';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Site')
@Controller('site')
export class SiteController extends BaseController<Site, SiteService> {
    constructor(service: SiteService) {
        super(service);
    }
    @Post(':id/assignAidatGrubu')
    assignAidatGrubu(@Param('id') id: string, @Body() params: { aidatGrubuId: string, baslangicTarihi: Date }) {
        return (this.service as SiteService).assignAidatGrubu(id, params.aidatGrubuId, params.baslangicTarihi);
    }
}
