import { Injectable } from '@nestjs/common';
import { KisiCuzdan } from './kisi-cuzdan.entity';
import { BaseService } from '../abstract/base.service';
import { KisiCuzdanRepository } from './kisi-cuzdan.repository';
import { KisiCuzdanGecmisRepository } from './kisi-cuzdan-gecmis.repository';
import { KisiCuzdanGecmis } from './kisi-cuzdan-gecmis';

@Injectable()
export class KisiCuzdanGecmisService {

    constructor(private cuzdanRepo: KisiCuzdanRepository,
        private repository: KisiCuzdanGecmisRepository) {
    }
    async create(entity: KisiCuzdanGecmis, meskenKisiId: string): Promise<KisiCuzdanGecmis> {
        await this.repository.save(entity);
        let cuzdanGecmisi = await this.repository.createQueryBuilder('cuzdanGecmisi')
            .innerJoin('cuzdanGecmisi.tahsilat', 'tahsilat')
            .where('tahsilat.meskenKisiId = :meskenKisiId', { meskenKisiId: meskenKisiId })
            .getMany();
        let cuzdan = await this.getCuzdan(meskenKisiId);
        if (!cuzdan) {
            cuzdan = new KisiCuzdan();
            cuzdan.meskenKisiId = meskenKisiId;
            cuzdan.tutar = 0;
        }
        cuzdan.tutar = cuzdanGecmisi.map(p => p.tutar).reduce((p, c) => p + c, 0)
        await this.cuzdanRepo.save(cuzdan);
        return entity;
    }
    async getCuzdan(meskenKisiId: string): Promise<KisiCuzdan> {
        return this.cuzdanRepo.createQueryBuilder('cuzdan')
            .where('cuzdan.meskenKisiId = :meskenKisiId', { meskenKisiId: meskenKisiId })
            .getOne();
    }
}
