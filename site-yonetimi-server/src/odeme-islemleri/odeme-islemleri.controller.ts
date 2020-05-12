import { Controller, Put, Body, ValidationPipe, Get, Post } from '@nestjs/common';
import { Tahsilat, OdemeYontemi } from '../tahsilat/tahsilat.entity';
import { OdemeIslemleriService } from './odeme-islemleri.service';
import { Tahakkuk } from '../tahakkuk/tahakkuk.entity';
import { TahsilatOlusturDto } from './tahsilat-olustur.dto';
import { TahsilatOlusturSonucuDto } from './tahsilat-olustur-sonucu.dto';

@Controller('odeme-islemleri')
export class OdemeIslemleriController {
    constructor(private odemeIslemleriService: OdemeIslemleriService) {
    }
    @Put('tahakkuk-ode')
    tahakkukOde(@Body(new ValidationPipe({ transform: true })) params: { selectedTahakkuks: string[], hesapHareketi: { tutar: number, odemeTarihi: Date, hesapId: string } }): Promise<Tahsilat> {
        return null;
        // return this.odemeIslemleriService.tahakkukOdeById(params.selectedTahakkuks, params.hesapHareketi.tutar, params.hesapHareketi.odemeTarihi,
        //     OdemeYontemi.HavaleEFT, params.hesapHareketi.hesapId);
    }
    @Post('tahsilat-olustur')
    tahsilatOlustur(@Body(new ValidationPipe({ transform: true })) dto: TahsilatOlusturDto): Promise<TahsilatOlusturSonucuDto> {
        return this.odemeIslemleriService.tahsilatOlustur(dto);
    }
}
