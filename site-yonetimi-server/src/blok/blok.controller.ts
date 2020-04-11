import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { BlokService } from './blok.service';
import { Blok } from './blok.entity';
import { BaseController } from '../abstract/base.controller';

@Controller('blok')
export class BlokController extends BaseController<Blok, BlokService> {
    constructor(service: BlokService) {
        super(service);
    }
    @Get(':siteId/bloks')
    findBySiteId(@Param('siteId') siteId: string): Promise<Blok[]> {
        return (this.service as BlokService).findBySiteId(siteId);
    }
    @Post(':id/assignAidatGrubu')
    assignAidatGrubu(@Param('id') id: string, @Body() params: { aidatGrubuId: string, baslangicTarihi: Date }) {
        return (this.service as BlokService).assignAidatGrubu(id, params.aidatGrubuId, params.baslangicTarihi);
    }
}
