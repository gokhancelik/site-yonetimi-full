import { Controller, Put, Param, Request, Body, UseInterceptors, ClassSerializerInterceptor, UseGuards, Get } from '@nestjs/common';
import { Tahakkuk } from './tahakkuk.entity';
import { BaseController } from '../abstract/base.controller';
import { TahakkukService } from './tahakkuk.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tahakkuk')
@Controller('tahakkuk')
export class TahakkukController extends BaseController<Tahakkuk, TahakkukService> {
    constructor(service: TahakkukService) {
        super(service);
    }
}