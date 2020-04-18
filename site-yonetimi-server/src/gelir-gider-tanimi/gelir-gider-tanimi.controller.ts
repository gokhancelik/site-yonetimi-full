import { Controller } from '@nestjs/common';
import { GelirGiderTanimi } from './gelir-gider-tanimi.entity';
import { GelirGiderTanimiService } from './gelir-gider-tanimi.service';
import { BaseController } from '../abstract/base.controller';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Gelir Gider Tanımı')
@Controller('gelir-gider-tanimi')
export class GelirGiderTanimiController extends BaseController<GelirGiderTanimi, GelirGiderTanimiService> {
    constructor(service: GelirGiderTanimiService) {
        super(service);
    }
}