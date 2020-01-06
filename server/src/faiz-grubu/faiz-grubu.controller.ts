import { Controller } from '@nestjs/common';
import { BaseController } from '../abstract/base.controller';
import { FaizGrubu } from './faiz-grubu.entity';
import { FaizGrubuService } from './faiz-grubu.service';

@Controller('faiz-grubu')
export class FaizGrubuController extends BaseController<FaizGrubu, FaizGrubuService> {
    constructor(service: FaizGrubuService) {
        super(service);
    }
}