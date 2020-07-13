import { Controller, Get, Param, Put, Body, Post, UseInterceptors, ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { BaseController } from '../abstract/base.controller';
import { Tahsilat, OdemeYontemi } from './tahsilat.entity';
import { TahsilatService } from './tahsilat.service';
import { TahsilatKalem } from '../tahsilat-kalem/tahsilat-kalem.entity';
import { TahsilatKalemService } from '../tahsilat-kalem/tahsilat-kalem.service';
import { ApiTags } from '@nestjs/swagger';
import { QueryDto } from '../hesap-hareketi/hesap-hareketi.controller';
import { Tahakkuk } from '../tahakkuk/tahakkuk.entity';

@ApiTags('Tahsilat')
@Controller('tahsilat')
export class TahsilatController extends BaseController<Tahsilat, TahsilatService> {
    constructor(service: TahsilatService,
        private tahsilatKalemService: TahsilatKalemService) {
        super(service);
    }
    @Get(':id/tahsilatKalems')
    getByTahsilatId(@Param('id') tahsilatId: string): Promise<TahsilatKalem[]> {
        return (this.tahsilatKalemService).getByTahsilatId(tahsilatId);
    }
    
    @Post('query')
    @UseInterceptors(ClassSerializerInterceptor)
    findQuery(@Body(new ValidationPipe({ transform: true })) query: QueryDto): Promise<[Tahsilat[], number]> {
        return this.service.findAllQuery(query);
    }
}