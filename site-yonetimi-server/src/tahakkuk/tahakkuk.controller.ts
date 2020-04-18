import { Controller, Put, Param, Body } from '@nestjs/common';
import { Tahakkuk } from './tahakkuk.entity';
import { BaseController } from '../abstract/base.controller';
import { TahakkukService } from './tahakkuk.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tahakkuk')
@Controller('tahakkuk')
export class TahakkukController extends BaseController<Tahakkuk, TahakkukService> {
    constructor(service: TahakkukService) {
        super(service);
    }
    @Put('ode')
    ode(@Body() params: { selectedTahakkuks: string[], hesapHareketi: { tutar: number, odemeTarihi: Date, hesapId: string } }): Promise<Tahakkuk[]> {
        return (this.service as TahakkukService).ode(params.selectedTahakkuks, params.hesapHareketi.tutar, params.hesapHareketi.odemeTarihi, params.hesapHareketi.hesapId);
    }
}