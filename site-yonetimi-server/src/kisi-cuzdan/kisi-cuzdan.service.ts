import { Injectable } from '@nestjs/common';
import { KisiCuzdan } from './kisi-cuzdan.entity';
import { BaseService } from '../abstract/base.service';
import { KisiCuzdanRepository } from './kisi-cuzdan.repository';

@Injectable()
export class KisiCuzdanService {

    constructor(private repository: KisiCuzdanRepository) {
    }
    async create(entity: KisiCuzdan, kisiId: string): Promise<KisiCuzdan> {
        await this.eskiKayitlariPasifYap(kisiId);
        await this.repository.save(entity);
        return entity;
    }
    async eskiKayitlariPasifYap(kisiId: string) {
        let eskiKayit = await this.getCuzdan(kisiId);
        eskiKayit.aktifMi = false;
        await this.repository.save(eskiKayit);
    }
    async getCuzdan(kisiId: string): Promise<KisiCuzdan> {
        return this.repository.createQueryBuilder('cuzdan')
            .innerJoin('cuzdan.tahsilat', 'tahsilat')
            .innerJoin('tahsilat.meskenKisi', 'meskenKisi')
            .where('meskenKisi.kisiId = :kisiId and aktifMi = :aktifMi', { kisiId: kisiId, aktifMi: true })
            .getOne();
    }
}
