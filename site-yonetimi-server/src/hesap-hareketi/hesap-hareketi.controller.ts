import { Controller, Get, Post, UseInterceptors, Bind, UploadedFile } from '@nestjs/common';
import { BaseController } from '../abstract/base.controller';
import { HesapHareketi } from './hesap-hareketi.entity';
import { HesapHareketiService } from './hesap-hareketi.service';
import { ApiTags } from '@nestjs/swagger';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import xlsx from 'node-xlsx';
@ApiTags('Hesap Hareketi')
@Controller('HesapHareketi')
export class HesapHareketiController extends BaseController<HesapHareketi, HesapHareketiService> {
    constructor(service: HesapHareketiService) {
        super(service);
    }

    @Get('/withInnerModel')
    getListWithInnerModel(): Promise<HesapHareketi[]> {
        return this.service.getListWithInnerModel();
    }
    @Post('/upload')
    @UseInterceptors(FileInterceptor('file'))
    @Bind(UploadedFile())
    uploadFile(file) {
        const workSheetsFromBuffer = xlsx.parse(file.buffer);
        const result: BankaHesapHareketi[] = [];
        for (let i = 1; i < workSheetsFromBuffer[0].data.length; i++) {
            result.push(new BankaHesapHareketi(workSheetsFromBuffer[0].data[i]));
        }
        return result;
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
