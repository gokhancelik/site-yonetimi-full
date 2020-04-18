import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { BagimsizBolum } from './bagimsiz-bolum.entity';
import { BaseController } from '../abstract/base.controller';
import { BagimsizBolumService } from './bagimsiz-bolum.service';
import { BagimsizBolumKisi } from '../bagimsiz-bolum-kisi/bagimsiz-bolum-kisi.entity';
import { BagimsizBolumKisiService } from '../bagimsiz-bolum-kisi/bagimsiz-bolum-kisi.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Bağımsız Bölüm')
@Controller('bagimsiz-bolum')
export class BagimsizBolumController extends BaseController<BagimsizBolum, BagimsizBolumService> {
    constructor(service: BagimsizBolumService, private bbkService: BagimsizBolumKisiService) {
        super(service);
    }
    @Get(':blokId/bagimsizBolums')
    findByBlokId(@Param('blokId') blokId: string): Promise<BagimsizBolum[]> {
        return (this.service as BagimsizBolumService).findByBlokId(blokId);
    }
    @Post(':id/assignAidatGrubu')
    assignAidatGrubu(@Param('id') id: string, @Body() params: { aidatGrubuId: string, baslangicTarihi: Date }) {
        return (this.service as BagimsizBolumService).assignAidatGrubu(id, params.aidatGrubuId, params.baslangicTarihi);
    }
    @Get(':id/Kisis')
    getKisis(@Param('id') id: string): Promise<BagimsizBolumKisi[]> {
        return this.bbkService.getByBagimsizBolumId(id);
    }
}