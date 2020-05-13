import { Controller, Put, Param, Request, Body, UseInterceptors, ClassSerializerInterceptor, UseGuards, Get, Post } from '@nestjs/common';
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
    @Post(':id/tahakkukOlustur')
    tahakkuklariOlustur(@Param('id') id: string, @Body() params: { tutar?: number, vadeTarihi?: Date, faizGrubuId?: string}): Promise<Tahakkuk[]> {
        return (this.service as TahakkukService).tahakkuklariOlustur(id, params.tutar, params.vadeTarihi, params.faizGrubuId);
    }
}