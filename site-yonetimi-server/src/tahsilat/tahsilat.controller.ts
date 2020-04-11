import { Controller, Get, Param } from '@nestjs/common';
import { BaseController } from '../abstract/base.controller';
import { Tahsilat } from './tahsilat.entity';
import { TahsilatService } from './tahsilat.service';
import { TahsilatKalem } from '../tahsilat-kalem/tahsilat-kalem.entity';
import { TahsilatKalemService } from '../tahsilat-kalem/tahsilat-kalem.service';

@Controller('tahsilat')
export class TahsilatController extends BaseController<Tahsilat, TahsilatService> {
    constructor(service: TahsilatService,
        private tahsilatKalemService: TahsilatKalemService) {
        super(service);
    }
    @Get(':id/tahsilatKalems')
    getByTahsilatId(@Param('id') tahsilatId: string): Promise<TahsilatKalem[]> {
        return (this.tahsilatKalemService).getByTahsilatId(tahsilatId);
    }
}