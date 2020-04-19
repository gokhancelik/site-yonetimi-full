import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { MeskenTipiService } from './mesken-tipi.service';
import { MeskenTipi } from './mesken-tipi.entity';
import { BaseController } from '../abstract/base.controller';
import { ApiTags } from '@nestjs/swagger';
import { Mesken } from '../mesken/mesken.entity';

@ApiTags('Mesken Tipi')
@Controller('mesken-tipi')
export class MeskenTipiController extends BaseController<MeskenTipi, MeskenTipiService> {
    constructor(service: MeskenTipiService) {
        super(service);
    }
    @Get('findByKod/:kod')
    findByKod(@Param('kod') kod: string): Promise<MeskenTipi> {
        return (this.service as MeskenTipiService).findByKod(kod);
    }
    @Get(':kod/meskens')
    getMeskensByKod(@Param('kod') kod: string): Promise<Mesken[]> {
        return (this.service as MeskenTipiService).getMeskensByKod(kod);
    }
}
