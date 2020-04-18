import { Controller } from '@nestjs/common';
import { BaseController } from '../abstract/base.controller';
import { AidatGrubu } from './aidat-grubu.entity';
import { AidatGrubuService } from './aidat-grubu.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('aidat-grubu')
@ApiTags('Aidat Grubu')
export class AidatGrubuController extends BaseController<AidatGrubu, AidatGrubuService> {
    constructor(service: AidatGrubuService) {
        super(service);
    }
}