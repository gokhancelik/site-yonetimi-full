import { Controller } from '@nestjs/common';
import { BaseController } from '../abstract/base.controller';
import { AidatGrubu } from './aidat-grubu.entity';
import { AidatGrubuService } from './aidat-grubu.service';

@Controller('aidat-grubu')
export class AidatGrubuController extends BaseController<AidatGrubu, AidatGrubuService> {
    constructor(service: AidatGrubuService) {
        super(service);
    }
}