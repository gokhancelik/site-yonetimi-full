import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { Site } from './site.entity';
import { SiteRepository } from './site.repository';
import { BaseService } from '../abstract/base.service';
import { BlokService } from '../blok/blok.service';
import { AidatGrubuAtandigiYer, BagimsizBolumAidatGrubu } from '../aidat-grubu/bagimsiz-bolum-aidat-grubu.entity';

@Injectable()
export class SiteService extends BaseService<Site>{

    constructor(repository: SiteRepository, private blokService: BlokService) {
        super(repository);
    }
    async assignAidatGrubu(id: string, aidatGrubuId: string, baslangicTarihi: Date, atandigiYer: AidatGrubuAtandigiYer = AidatGrubuAtandigiYer.Site): Promise<BagimsizBolumAidatGrubu[]> {
        let result = []
        let bloks = await this.blokService.findBySiteId(id);
        for (let i = 0; i < bloks.length; i++) {
            const blok = bloks[i];
            let res = await this.blokService.assignAidatGrubu(blok.id, aidatGrubuId, baslangicTarihi, atandigiYer);
            result = [...result, ...res]
        }
        return result;
    }
}
