import { Injectable } from '@nestjs/common';
import { KisiCuzdan } from './kisi-cuzdan.entity';
import { BaseService } from '../abstract/base.service';
import { KisiCuzdanRepository } from './kisi-cuzdan.repository';

@Injectable()
export class KisiCuzdanService {

    constructor(private repository: KisiCuzdanRepository) {
    }
    async create(tutar: number, tahsilatId: string, kisiId: string): Promise<KisiCuzdan> {
        await this.eskiKayitlariPasifYap(kisiId);
        let entity = new KisiCuzdan();
        entity.tahsilatId = tahsilatId;
        entity.tutar = tutar;
        entity.aktifMi = true;
        await this.repository.save(entity);
        return entity;
    }
    async createByMeskenKisiId(tutar: number, tahsilatId: string, meskenKisiId: string): Promise<KisiCuzdan> {
        await this.eskiKayitlariPasifYapMeskenKisiId(meskenKisiId);
        let entity = new KisiCuzdan();
        entity.tahsilatId = tahsilatId;
        entity.tutar = tutar;
        entity.aktifMi = true;
        await this.repository.save(entity);
        return entity;
    }
    async eskiKayitlariPasifYap(kisiId: string) {
        let eskiKayit = await this.getCuzdan(kisiId);
        if (eskiKayit) {
            eskiKayit.aktifMi = false;
            await this.repository.save(eskiKayit);
        }
    }
    async eskiKayitlariPasifYapMeskenKisiId(meskenKisiId: string) {
        let eskiKayit = await this.getCuzdanByMeskenKisiId(meskenKisiId);
        if (eskiKayit) {
            eskiKayit.aktifMi = false;
            await this.repository.save(eskiKayit);
        }
    }
    async getCuzdan(kisiId: string): Promise<KisiCuzdan> {
        return this.repository.createQueryBuilder('cuzdan')
            .innerJoin('cuzdan.tahsilat', 'tahsilat')
            .innerJoin('tahsilat.meskenKisi', 'meskenKisi')
            .where('meskenKisi.kisiId = :kisiId and aktifMi = :aktifMi', { kisiId: kisiId, aktifMi: true })
            .getOne();
    }
    async getCuzdanByMeskenKisiId(meskenKisiId: string): Promise<KisiCuzdan> {
        // let result = this.repository.findOne({
        //     where: {
        //         tahsilat: {
        //             meskenKisiId: meskenKisiId
        //         },
        //         aktifMi: true
        //     },

        // });
        // return result;
        //.getOne();

        return this.repository.createQueryBuilder('cuzdan')
            .innerJoinAndSelect('cuzdan.tahsilat', 'tahsilat')
            .innerJoinAndSelect('tahsilat.meskenKisi', 'meskenKisi')
            .leftJoinAndSelect('tahsilat.tahsilatKalems', 'tahsilatKalem')
            .where('meskenKisi.id = :meskenKisiId and aktifMi = :aktifMi', { meskenKisiId: meskenKisiId, aktifMi: true })
            .printSql()
            .getOne();
    }
}
