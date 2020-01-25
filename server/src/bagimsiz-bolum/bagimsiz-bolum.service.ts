import { Injectable } from '@nestjs/common';
import { BaseService } from '../abstract/base.service';
import { BagimsizBolum } from './bagimsiz-bolum.entity';
import { BagimsizBolumRepository } from './bagimsiz-bolum.repository';
import { BagimsizBolumAidatGrubu, AidatGrubuAtandigiYer } from '../aidat-grubu/bagimsiz-bolum-aidat-grubu.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BagimsizBolumService extends BaseService<BagimsizBolum>{

    constructor(repository: BagimsizBolumRepository, @InjectRepository(BagimsizBolumAidatGrubu) private bagimsizBolumAidatGrubuRepository: Repository<BagimsizBolumAidatGrubu>) {
        super(repository);
    }
    
    async findByBlokId(blokId: string): Promise<BagimsizBolum[]> {
        return (this.repository as BagimsizBolumRepository).findByBlokId(blokId);
    }
    async assignAidatGrubu(id: string, aidatGrubuId: string, baslangicTarihi: Date, atandigiYer: AidatGrubuAtandigiYer = AidatGrubuAtandigiYer.BagimsizBolum): Promise<BagimsizBolumAidatGrubu> {
        let aidatGrubus = await this.bagimsizBolumAidatGrubuRepository.createQueryBuilder('bbag')
            .where('bbag.bagimsizBolumId = :bagimsizBolumId AND bbag.bitisTarihi is null', { bagimsizBolumId: id })
            .getMany();
        for (let i = 0; i < aidatGrubus.length; i++) {
            const aidatGrubu = aidatGrubus[i];
            aidatGrubu.bitisTarihi = baslangicTarihi;
        }
        await this.bagimsizBolumAidatGrubuRepository.save(aidatGrubus);
        let newGrup = this.bagimsizBolumAidatGrubuRepository.create();
        newGrup.aidatGrubuId = aidatGrubuId;
        newGrup.baslangicTarihi = baslangicTarihi;
        newGrup.aidatGrubuAtandigiYer = atandigiYer;
        newGrup.bagimsizBolumId = id;
        return (this.bagimsizBolumAidatGrubuRepository).save(newGrup);
    }
}
