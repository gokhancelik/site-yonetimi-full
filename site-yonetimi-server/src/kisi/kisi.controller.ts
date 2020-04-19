import { Controller, Get, Param } from '@nestjs/common';
import { BaseController } from '../abstract/base.controller';
import { Kisi } from './kisi.entity';
import { KisiService } from './kisi.service';
import { ApiTags } from '@nestjs/swagger';
import { MeskenKisi } from '../mesken-kisi/mesken-kisi.entity';
import { MeskenKisiService } from '../mesken-kisi/mesken-kisi.service';

@ApiTags('Kişi')
@Controller('kisi')
export class KisiController extends BaseController<Kisi, KisiService> {
    constructor(service: KisiService, private meskenKisiService: MeskenKisiService) {
        super(service);
    }
    @Get(':id/meskens')
    getMeskens(@Param('id') id: string): Promise<MeskenKisi[]> {
        return this.meskenKisiService.getByKisiId(id);
    }
}