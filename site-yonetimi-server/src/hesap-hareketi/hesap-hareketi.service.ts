import { Injectable } from '@nestjs/common';
import { BaseService } from '../abstract/base.service';
import { HesapHareketi } from './hesap-hareketi.entity';
import { HesapHareketiRepository } from './hesap-hareketi.repository';
import { Connection, SelectQueryBuilder, IsNull, MoreThan, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { QueryDto } from './hesap-hareketi.controller';
import { buildWhereQuery } from '../abstract/query-helper';
@Injectable()
export class HesapHareketiService extends BaseService<HesapHareketi> {





    constructor(repository: HesapHareketiRepository,
        private connection: Connection) {
        super(repository);
    }

    getListWithInnerModel(query: QueryDto): Promise<HesapHareketi[]> {
        let result = this.repository.createQueryBuilder('hh')
            .addSelect('SUM (hh.tutar) OVER (PARTITION BY hh.hesapTanimiId ORDER BY hh.islemTarihi, hh.id)', 'hh_bakiye')
            .leftJoinAndSelect('hh.hesapTanimi', 'ht')
            .leftJoinAndSelect('hh.borc', 'b')
            .leftJoinAndSelect('hh.tahsilat', 't')
            .orderBy('hh.islemTarihi', 'DESC');
        result = buildWhereQuery(result, query.filter);
        return result.getMany();
    }
    getIslenmemisTahsilatlar(query: QueryDto): Promise<HesapHareketi[]> {
        let result = HesapHareketi.find({
            where: {
                borcId: IsNull(),
                tahsilatId: IsNull(),
                islemTarihi: MoreThanOrEqual(new Date(2020, 6, 22)),
                tutar: MoreThan(0)
            },
            order: {
                islemTarihi: 'DESC'
            }
        });

        return result;
    }
    getIslenmemisOdemeler(query: QueryDto): Promise<HesapHareketi[]> {
        let result = HesapHareketi.find({
            where: {
                borcId: IsNull(),
                tahsilatId: IsNull(),
                tutar: LessThanOrEqual(0)
            },
            order: {
                islemTarihi: 'DESC'
            }
        });

        return result;
    }
    getHesapHareketleriByHesapId(hesapTanimiId: string, query: QueryDto): Promise<HesapHareketi[]> {
        let result = this.repository.createQueryBuilder('hh')
            .addSelect('SUM (hh.tutar) OVER (PARTITION BY hh.hesapTanimiId ORDER BY hh.islemTarihi, hh.id)', 'hh_bakiye')
            .leftJoinAndSelect('hh.hesapTanimi', 'ht')
            .leftJoinAndSelect('hh.borc', 'b')
            .leftJoinAndSelect('hh.tahsilat', 't')
            .orderBy('hh.id', 'DESC')
            .where('hh.hesapTanimiId = :hesapTanimiId', { hesapTanimiId });
        result = buildWhereQuery(result, query.filter);
        return result.getMany();
    }
    async transfer(dto: { toHesapId: string, fromHesapId: string; tutar: number, islemTarihi: Date }): Promise<HesapHareketi[]> {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const { toHesapId, tutar, islemTarihi, fromHesapId } = dto;
        let to = await HesapHareketi.olustur(new Date(islemTarihi), Number(tutar), toHesapId);
        let from = await HesapHareketi.olustur(new Date(islemTarihi), Number(tutar) * -1, fromHesapId);
        try {
            queryRunner.manager.save(to);
            queryRunner.manager.save(from);
            await queryRunner.commitTransaction();
        } catch (err) {
            // since we have errors lets rollback the changes we made
            await queryRunner.rollbackTransaction();
        } finally {
            // you need to release a queryRunner which was manually instantiated
            await queryRunner.release();
        }
        return [to, from];
    }
    async aktarim(data: HesapHareketi[]): Promise<HesapHareketi[]> {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await HesapHareketi.save(data);
            await queryRunner.commitTransaction();
        } catch (err) {
            // since we have errors lets rollback the changes we made
            await queryRunner.rollbackTransaction();
        } finally {
            // you need to release a queryRunner which was manually instantiated
            await queryRunner.release();
        }
        return data;
    }
}
