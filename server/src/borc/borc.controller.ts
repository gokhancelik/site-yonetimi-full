import { Controller } from '@nestjs/common';
import { BorcService } from './Borc.service';
import { Borc } from './Borc.entity';
import { BaseController } from '../abstract/base.controller';

@Controller('Borc')
export class BorcController extends BaseController<Borc, BorcService> {
    constructor(service: BorcService) {
        super(service);
    }
}
