import { Controller } from '@nestjs/common';
import { BaseController } from '../abstract/base.controller';
import { Tahsilat } from './tahsilat.entity';
import { TahsilatService } from './tahsilat.service';

@Controller('tahsilat')
export class TahsilatController extends BaseController<Tahsilat, TahsilatService> {
    constructor(service: TahsilatService) {
        super(service);
    }
}