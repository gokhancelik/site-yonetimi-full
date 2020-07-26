import { Injectable } from '@nestjs/common';
import { BaseService } from '../abstract/base.service';
import { Tahsilat } from './tahsilat.entity';
import { TahsilatRepository } from './tahsilat.repository';
import { QueryDto } from '../hesap-hareketi/hesap-hareketi.controller';
import { buildFindCondition, buildOrder } from '../abstract/query-helper';

@Injectable()
export class TahsilatService extends BaseService<Tahsilat>{
    findByTahsilatNo(tahsilatNo: string): Promise<Tahsilat> {
        return Tahsilat.findOne({
            where: {
                tahsilatNo: tahsilatNo
            }
        });
    }


    constructor(repository: TahsilatRepository) {
        super(repository);
    }

    getTahsilatlarByUserId(userId: any): Promise<Tahsilat[]> {
        return Tahsilat.find({
            join: {
                alias: 'tahsilat',
                innerJoinAndSelect: {
                    meskenKisi: 'tahsilat.meskenKisi',
                    tahsilatKalems: 'tahsilat.tahsilatKalems'
                }
            },
            where: qb => {
                qb.where({
                    durumu: 1
                })
                .andWhere('meskenKisi.kisiId = :userId', { userId: userId })
            },
            order: {
                odemeTarihi: 'DESC'
            }
        });
        // this.repository.createQueryBuilder('tahsilat')
        //     .innerJoin('tahsilat.meskenKisi', 'mk')
        //     .where('mk.kisiId = :userId and durumu = 1', { userId })
        //     .getMany();
    }
    getDagitilacakTahsilatlar(): Promise<{
        kisiId,
        meskenKisiId, ad, soyad, odemeTarihi, toplamtutar, odemeYontemi
    }[]> {
        return this.repository.query(`
        SELECT t.meskenKisiId, k.id kisiId, k.ad, k.soyad, t.odemeTarihi, t.odemeYontemi, sum(t.tutar) as toplamtutar, sum(t.kullanilanTutar) as kullanilanTutar
        FROM [u8998566_zsity].[dbo]. Tahsilat t
        join [TahsilatKalem] tk on tk.tahsilatId = t.id
        join MeskenKisi mk on mk.id = t.meskenKisiId
        join Kisi k on k.id = mk.kisiId
        where t.durumu = 0 and t.tutar>0
        group by t.meskenKisiId, k.id,k.ad, k.soyad, t.odemeTarihi, t.odemeYontemi
        order by t.meskenKisiId, t.odemeTarihi asc
        `);
        // .createQueryBuilder('tahsilat')
        //     .innerJoinAndSelect('tahsilat.tahsilatKalems', 'tk')
        //     .innerJoinAndSelect('tahsilat.meskenKisi', 'mk')
        //     .where('tahsilat.durumu = 0')
        //     .orderBy('tahsilat.odemeTarihi')
        //     // .andWhere('tahsilat.odemeYontemi <> 0')
        //     .groupBy('tahsilat.meskenKisiId')
        //     .gr('tahsilat.meskenKisiId')
        //     .getMany();
    }
    getByTahakkukId(): Promise<Tahsilat[]> {
        throw new Error("Method not implemented.");
    }
    findAllQuery(query: QueryDto): Promise<[Tahsilat[], number]> {
        let whereCondition = buildFindCondition(query.filter);
        let result = Tahsilat.findAndCount<Tahsilat>({
            where: whereCondition,
            take: query.take,
            skip: query.skip,
            order: buildOrder(query.sort)
        });
        return result;
    }

}
