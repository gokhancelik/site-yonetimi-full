import { Controller, Put, Body, Param } from '@nestjs/common';
import { BorcService } from './Borc.service';
import { Borc } from './Borc.entity';
import { BaseController } from '../abstract/base.controller';

@Controller('Borc')
export class BorcController extends BaseController<Borc, BorcService> {
    constructor(service: BorcService) {
        super(service);
    }
    @Put(':id/ode')
    ode(@Param('id') id: string, @Body() params: { tutar: number, odemeTarihi: Date }) {
        return (this.service as BorcService).ode(id, params.tutar, params.odemeTarihi);
    }
}
