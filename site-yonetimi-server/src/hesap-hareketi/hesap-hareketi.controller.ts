import { Controller, Get } from '@nestjs/common';
import { BaseController } from '../abstract/base.controller';
import { HesapHareketi } from './hesap-hareketi.entity';
import { HesapHareketiService } from './hesap-hareketi.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Hesap Hareketi')
@Controller('HesapHareketi')
export class HesapHareketiController extends BaseController<HesapHareketi, HesapHareketiService> {
    constructor(service: HesapHareketiService) {
        super(service);
    }

    @Get('/withInnerModel')
    getListWithInnerModel(): Promise<HesapHareketi[]> {
        return this.service.getListWithInnerModel();
    }
}
