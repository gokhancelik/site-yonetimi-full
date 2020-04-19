import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { MeskenService } from './mesken.service';
import { Mesken } from './mesken.entity';
import { BaseController } from '../abstract/base.controller';
import { ApiTags } from '@nestjs/swagger';
import { MeskenKisiService } from '../mesken-kisi/mesken-kisi.service';
import { MeskenKisi } from '../mesken-kisi/mesken-kisi.entity';

@ApiTags('Mesken')
@Controller('mesken')
export class MeskenController extends BaseController<Mesken, MeskenService> {
    constructor(service: MeskenService, private meskenKisiService: MeskenKisiService) {
        super(service);
    }
    @Get(':ustId/alts')
    findBySiteId(@Param('ustId') ustId: string): Promise<Mesken[]> {
        return (this.service as MeskenService).findByUstId(ustId);
    }
    @Post(':id/assignAidatGrubu')
    assignAidatGrubu(@Param('id') id: string, @Body() params: { aidatGrubuId: string, baslangicTarihi: Date }) {
        return (this.service as MeskenService).assignAidatGrubu(id, params.aidatGrubuId, params.baslangicTarihi);
    }
    @Get(':id/Kisis')
    getKisis(@Param('id') id: string): Promise<MeskenKisi[]> {
        return this.meskenKisiService.getByMeskenId(id);
    }
}
