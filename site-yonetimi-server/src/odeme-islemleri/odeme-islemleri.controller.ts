import { Controller, Put, Body, ValidationPipe, Get, Post } from '@nestjs/common';
import { Tahsilat, OdemeYontemi } from '../tahsilat/tahsilat.entity';
import { OdemeIslemleriService } from './odeme-islemleri.service';
import { Tahakkuk } from '../tahakkuk/tahakkuk.entity';
import { TahsilatOlusturDto } from './tahsilat-olustur.dto';
import { TahsilatOlusturSonucuDto } from './tahsilat-olustur-sonucu.dto';
import { SanalPosService } from '../sanal-pos/sanal-pos.service';
import { SanalPos } from '../sanal-pos/sanal-pos.entity';

@Controller('odeme-islemleri')
export class OdemeIslemleriController {
    constructor(private odemeIslemleriService: OdemeIslemleriService,
    ) {
    }
    @Put('tahakkuk-ode')
    tahakkukOde(@Body(new ValidationPipe({ transform: true })) dto: TahsilatOlusturSonucuDto): Promise<Tahsilat[]> {
        return this.odemeIslemleriService.tahsilatKaydet(dto);
        // return this.odemeIslemleriService.tahakkukOdeById(params.selectedTahakkuks, params.hesapHareketi.tutar, params.hesapHareketi.odemeTarihi,
        //     OdemeYontemi.HavaleEFT, params.hesapHareketi.hesapId);
    }
    @Post('tahsilat-olustur')
    tahsilatOlustur(@Body(new ValidationPipe({ transform: true })) dto: TahsilatOlusturDto): Promise<TahsilatOlusturSonucuDto> {
        return this.odemeIslemleriService.tahsilatOlustur(dto);
    }
    @Post('odemeleri-dagit')
    async odemeleriDagit(): Promise<void> {
        let sanalPos = await SanalPos.findOne();
        return this.odemeIslemleriService.odemeleriDagit(sanalPos.komisyon);
    }
}
