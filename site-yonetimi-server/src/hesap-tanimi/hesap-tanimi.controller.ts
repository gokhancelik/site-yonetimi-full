import { Controller } from '@nestjs/common';
import { BaseController } from '../abstract/base.controller';
import { HesapTanimi } from './hesap-tanimi.entity';
import { HesapTanimiService } from './hesap-tanimi.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Hesap Tanımı')
@Controller('hesap-tanimi')
export class HesapTanimiController extends BaseController<HesapTanimi, HesapTanimiService> {
    constructor(service: HesapTanimiService) {
        super(service);
    }
}