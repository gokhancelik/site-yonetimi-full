import { Controller, Put, Body, Param, Get } from '@nestjs/common';
import { BaseController } from '../abstract/base.controller';
import { BorcService } from './borc.service';
import { Borc } from './borc.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Borç')
@Controller('Borc')
export class BorcController extends BaseController<Borc, BorcService> {
    constructor(service: BorcService) {
        super(service);
    }
    @Put(':id/ode')
    ode(@Param('id') id: string, @Body() params: { tutar: number, odemeTarihi: Date, hesapId: string }): Promise<Borc> {
        return (this.service as BorcService).ode(id, params.tutar, params.odemeTarihi, params.hesapId);
    }
    @Get(':firmaId/borcs')
    getBorcByFirmaId(@Param('firmaId') firmaId: string): Promise<Borc[]> {
        return this.service.getBorcByFirmaId(firmaId);
    }
}
