import { Injectable } from '@nestjs/common';
import { Borc, BorcDurumu } from './borc.entity';
import { BaseService } from '../abstract/base.service';
import { BorcRepository } from './borc.repository';
import { Transaction } from 'typeorm';
import { HesapHareketiService } from '../hesap-hareketi/hesap-hareketi.service';
import { HesapHareketi } from '../hesap-hareketi/hesap-hareketi.entity';
import { HareketTipi } from '../gelir-gider-tanimi/gelir-gider-tanimi.entity';

@Injectable()
export class BorcService extends BaseService<Borc> {
    constructor(repository: BorcRepository, 
                private hesapHareketiService: HesapHareketiService) {
        super(repository);

    }
    
    @Transaction()
    async ode(id: string, tutar: number, odemeTarihi: Date) : Promise<Borc> {
        const borc = await this.findById(id);
        const hesapHareketi = new HesapHareketi(odemeTarihi, HareketTipi.Gider, -tutar, null, id);

        borc.odenenTutar += tutar; 
        if(borc.odenenTutar >= borc.tutar)
            borc.durumu = BorcDurumu.Odendi;

        await this.hesapHareketiService.create(hesapHareketi);
        return this.update(id, borc);        
    }
}
