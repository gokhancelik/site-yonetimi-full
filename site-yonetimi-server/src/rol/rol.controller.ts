import { Controller } from '@nestjs/common';
import { Rol } from './rol.entity';
import { RolService } from './rol.service';
import { BaseController } from '../abstract/base.controller';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Rol')
@Controller('rol')
export class RolController extends BaseController<Rol, RolService> {
    constructor(service: RolService) {
        super(service);
    }
}
