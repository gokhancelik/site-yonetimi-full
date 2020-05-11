import { Controller, Put, Body } from '@nestjs/common';
import { Tahsilat, OdemeYontemi } from '../tahsilat/tahsilat.entity';
import { OdemeIslemleriService } from './odeme-islemleri.service';

@Controller('odeme-islemleri')
export class OdemeIslemleriController {
    constructor(private odemeIslemleriService: OdemeIslemleriService) {
    }
    @Put('tahakkuk-ode')
    ode(@Body() params: { selectedTahakkuks: string[], hesapHareketi: { tutar: number, odemeTarihi: Date, hesapId: string } }): Promise<Tahsilat> {
        return this.odemeIslemleriService.tahakkukOdeById(params.selectedTahakkuks, params.hesapHareketi.tutar, params.hesapHareketi.odemeTarihi,
            OdemeYontemi.HavaleEFT, params.hesapHareketi.hesapId);
    }
}
