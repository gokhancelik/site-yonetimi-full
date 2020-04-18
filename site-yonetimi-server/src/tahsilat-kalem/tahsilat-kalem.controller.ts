import { Controller, Get, Param } from '@nestjs/common';
import { BaseController } from '../abstract/base.controller';
import { TahsilatKalem } from './tahsilat-kalem.entity';
import { TahsilatKalemService } from './tahsilat-kalem.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tahsilat Kalem')
@Controller('tahsilat-kalem')
export class TahsilatKalemController extends BaseController<TahsilatKalem, TahsilatKalemService> {
    constructor(service: TahsilatKalemService) {
        super(service);
    }

}