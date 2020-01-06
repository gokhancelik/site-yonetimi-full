import { Injectable } from '@nestjs/common';
import { Blok } from './blok.entity';
import { DeleteResult } from 'typeorm';
import { BlokRepository } from './blok.repository';
import { BaseService } from '../abstract/base.service';
import { BagimsizBolumService } from '../bagimsiz-bolum/bagimsiz-bolum.service';
import { AidatGrubuAtandigiYer, BagimsizBolumAidatGrubu } from '../aidat-grubu/bagimsiz-bolum-aidat-grubu.entity';

@Injectable()
export class BlokService extends BaseService<Blok> {
    constructor(repository: BlokRepository, private bagimsizBolumService: BagimsizBolumService) {
        super(repository);
    }
    async findBySiteId(siteId: string): Promise<Blok[]> {
        return (this.repository as BlokRepository).findBySiteId(siteId);
    }
    async assignAidatGrubu(id: string, aidatGrubuId: string, baslangicTarihi: Date, atandigiYer: AidatGrubuAtandigiYer = AidatGrubuAtandigiYer.Blok): Promise<BagimsizBolumAidatGrubu[]> {
        let result = []
        let bbs = await this.bagimsizBolumService.findByBlokId(id);
        for (let i = 0; i < bbs.length; i++) {
            const bb = bbs[i];
            let res = await this.bagimsizBolumService.assignAidatGrubu(bb.id, aidatGrubuId, baslangicTarihi, atandigiYer);
            result.push(res);
        }
        return result;
    }
}
