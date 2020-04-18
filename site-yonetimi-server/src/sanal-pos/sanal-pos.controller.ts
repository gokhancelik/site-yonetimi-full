import { Controller } from '@nestjs/common';
import { BaseController } from '../abstract/base.controller';
import { SanalPos } from './sanal-pos.entity';
import { SanalPosService } from './sanal-pos.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Sanal Pos')
@Controller('sanal-pos')
export class SanalPosController extends BaseController<SanalPos, SanalPosService> {
    constructor(service: SanalPosService) {
        super(service);
    }
}