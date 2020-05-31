import { Controller, Get, Param } from '@nestjs/common';
import { BaseController } from '../abstract/base.controller';
import { HesapTanimi } from './hesap-tanimi.entity';
import { HesapTanimiService } from './hesap-tanimi.service';
import { ApiTags } from '@nestjs/swagger';
import { HesapHareketi } from '../hesap-hareketi/hesap-hareketi.entity';
import { HesapHareketiService } from '../hesap-hareketi/hesap-hareketi.service';

@ApiTags('Hesap Tanımı')
@Controller('hesap-tanimi')
export class HesapTanimiController extends BaseController<HesapTanimi, HesapTanimiService> {
    constructor(service: HesapTanimiService,
        private hesapHareketiService: HesapHareketiService) {
        super(service);
    }
    @Get(':id/hesap-hareketleri')
    getHesapHareketleri(@Param('id') id: string): Promise<HesapHareketi[]> {
        return this.hesapHareketiService.getHesapHareketleriByHesapId(id);
    }
}