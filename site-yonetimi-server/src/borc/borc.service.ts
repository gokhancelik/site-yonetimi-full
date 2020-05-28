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
    async ode(id: string, tutar: number, odemeTarihi: Date, hesapId: string): Promise<Borc> {
        const borc = await this.findById(id);
        const hesapHareketi = await HesapHareketi.olustur(odemeTarihi, -Number(tutar), hesapId, null, id);
        if (!borc.odenenTutar) {
            borc.odenenTutar = 0;
        }
        borc.odenenTutar += Number(tutar);
        if (borc.odenenTutar >= borc.tutar)
            borc.durumu = BorcDurumu.Odendi;
        // await this.hesapHareketiService.create(hesapHareketi);
        return this.update(id, borc);
    }
    getBorcByFirmaId(firmaId: string): Promise<Borc[]> {
        return this.repository.createQueryBuilder('borc')
            .where('borc.firmaId = :firmaId', { firmaId })
            .getMany();
    }
}       
