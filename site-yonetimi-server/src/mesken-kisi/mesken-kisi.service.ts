import { Injectable } from '@nestjs/common';
import { BaseService } from '../abstract/base.service';
import { MeskenKisi } from './mesken-kisi.entity';
import { MeskenKisiRepository } from './mesken-kisi.repository'
import { MeskenRepository } from '../mesken/mesken.repository';
import { Tahakkuk, AidatDurumu } from '../tahakkuk/tahakkuk.entity';
import { TahakkukRepository } from '../tahakkuk/tahakkuk.repository';
import { SelectQueryBuilder, LessThanOrEqual } from 'typeorm';
@Injectable()
export class MeskenKisiService extends BaseService<MeskenKisi>{
    constructor(repository: MeskenKisiRepository) {
        super(repository);
    }
    async getOdenmemisAidatlarByMeskenKisiId(meskenKisiId: string): Promise<Tahakkuk[]> {
        let today = new Date();
        let gelecekAy = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        var aidatlar$ =
            Tahakkuk.find({
                join: {
                    alias: 'tahakkuk',
                    leftJoinAndSelect: {
                        tahsilatKalems: 'tahakkuk.tahsilatKalems',
                        tahsilat: 'tahsilatKalems.tahsilat',
                        meskenKisi: 'tahakkuk.meskenKisi',
                        odemeTipi: 'tahakkuk.odemeTipi',
                        tahsilatKalemOdemeTipi: 'tahsilatKalems.odemeTipi'
                    },
                },
                where: (qb: SelectQueryBuilder<Tahakkuk>) => {
                    qb.where({
                        durumu: AidatDurumu.Odenmedi,
                        vadeTarihi: LessThanOrEqual(gelecekAy)
                    }).andWhere(
                        'meskenKisi.id = :meskenKisiId', { meskenKisiId }
                    )
                },
                order: {
                    vadeTarihi: 'ASC'
                }
            })
        return aidatlar$;
    }
    async getAllWithKisi(): Promise<MeskenKisi[]> {
        return this.repository.createQueryBuilder('mk')
            .innerJoinAndSelect('mk.kisi', 'k')
            .innerJoinAndSelect('mk.mesken', 'm')
            .getMany();
    }
    async getByKisiId(kisiId: string): Promise<MeskenKisi[]> {
        return this.repository.createQueryBuilder('mk')
            .innerJoinAndSelect('mk.mesken', 'm')
            .innerJoinAndSelect('mk.kisi', 'k')
            .where('mk.kisiId = :kisiId', { kisiId: kisiId })
            .getMany();
    }
    async getByMeskenId(meskenId: string): Promise<MeskenKisi[]> {
        return this.repository.createQueryBuilder('mk')
            .innerJoinAndSelect('mk.mesken', 'm')
            .innerJoinAndSelect('mk.kisi', 'k')
            .where('mk.meskenId = :meskenId', { meskenId: meskenId })
            .getMany();
    }
    async getByMeskenKod(bagimsizBolumKod: string): Promise<MeskenKisi> {
        return this.repository.createQueryBuilder('mk')
            .innerJoinAndSelect('mk.mesken', 'm')
            .innerJoinAndSelect('mk.kisi', 'k')
            .where('m.kod = :bagimsizBolumKod', { bagimsizBolumKod: bagimsizBolumKod })
            .getOne();
    }
}
