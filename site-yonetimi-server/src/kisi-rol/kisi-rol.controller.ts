import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../abstract/base.controller';
import { KisiRol } from './kisi-rol.entity';
import { KisiRolService } from './kisi-rol.service';

@ApiTags('Kişi Rol')
@Controller('kisi-rol')
export class KisiRolController extends BaseController<KisiRol, KisiRolService> {
    constructor(service: KisiRolService) {
        super(service);
    }
}
