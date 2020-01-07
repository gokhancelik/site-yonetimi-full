import { Controller } from '@nestjs/common';
import { BaseController } from '../abstract/base.controller';
import { Kisi } from './kisi.entity';
import { KisiService } from './kisi.service';

@Controller('kisi')
export class KisiController extends BaseController<Kisi, KisiService> {
    constructor(service: KisiService) {
        super(service);
    }
}