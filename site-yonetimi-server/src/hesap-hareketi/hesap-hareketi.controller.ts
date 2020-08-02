import { Controller, Get, Post, UseInterceptors, Bind, UploadedFile, Body, Param, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { BaseController } from '../abstract/base.controller';
import { HesapHareketi } from './hesap-hareketi.entity';
import { HesapHareketiService } from './hesap-hareketi.service';
import { ApiTags } from '@nestjs/swagger';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import xlsx from 'node-xlsx';
import { IsArray, IsOptional, IsNumber, IsNumberString } from "class-validator";
import { Type, Transform } from 'class-transformer';
import { HesapHareketiUploaderService } from './hesap-hareketi-uploader/hesap-hareketi-uploader.service';
export class QueryDto {
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    take: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    skip: number;

    @IsOptional()
    @IsArray()
    @Type(() => String)
    @Transform((value: string) => {
        console.log(value)
        return value;
    })
    filter: any[];

    @IsOptional()
    @IsArray()
    @Type(() => String)
    @Transform((value: string) => {
        return value;
    })
    group: any[];

    @IsOptional()
    @IsArray()
    @Type(() => SortDto)
    @Transform((value: string) => {
        return value;
    })
    sort: SortDto[];

}
export class SortDto {
    @IsOptional()
    @Type(() => String)
    selector: string;
    @Type(() => Boolean)
    desc: boolean;
}
@ApiTags('Hesap Hareketi')
@Controller('HesapHareketi')
export class HesapHareketiController extends BaseController<HesapHareketi, HesapHareketiService> {
    constructor(service: HesapHareketiService, private hesapHareketiUploader: HesapHareketiUploaderService) {
        super(service);
    }

    @Post('/withInnerModel')
    getListWithInnerModel(@Body(new ValidationPipe({ transform: true })) query: QueryDto): Promise<HesapHareketi[]> {
        return this.service.getListWithInnerModel(query);
    }
    @Get('/islenmemis-tahsilatlar')
    getIslenmemisTahsilatlar(@Body(new ValidationPipe({ transform: true })) query: QueryDto): Promise<HesapHareketi[]> {
        return this.service.getIslenmemisTahsilatlar(query);
    }
    @Get('/islenmemis-odemeler')
    getIslenmemisOdemeler(@Body(new ValidationPipe({ transform: true })) query: QueryDto): Promise<HesapHareketi[]> {
        return this.service.getIslenmemisOdemeler(query);
    }
    @Post('transfer')
    transfer(@Body() dto: { toHesapId: string, fromHesapId: string, tutar: number, islemTarihi: Date }): Promise<HesapHareketi[]> {
        return this.service.transfer(dto);
    }
    @Post('/upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: any, @Body() body: { bankName: string }) {
        return this.hesapHareketiUploader.mapFromExcel(file.buffer, body.bankName);
    }
    @Post('/aktar')
    aktar(@Body() body: HesapHareketi[]) {

        return this.service.aktarim(body);
    }
}

export class BankaHesapHareketi {
    tarih: Date;
    aciklama: string;
    etiket: string;
    tutar: number;
    bakiye: number;
    dekontNo: string;
    kisiId: string;
    borcId: string;
    hesapId: string;
    constructor(value: any[]) {
        const dateValue: string = value[0].split('/');
        this.tarih = new Date(Number(dateValue[2]), Number(dateValue[1]), Number(dateValue[0]));
        this.aciklama = value[1];
        this.etiket = value[2];
        this.tutar = Number(value[3]);
        this.bakiye = Number(value[4]);
        this.dekontNo = value[5];
        this.kisiId = '';
        this.borcId = '';
        this.hesapId = '';
    }
}
