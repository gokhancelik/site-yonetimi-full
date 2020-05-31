import { Injectable } from '@nestjs/common';
import { BaseService } from '../abstract/base.service';
import { HesapHareketi } from './hesap-hareketi.entity';
import { HesapHareketiRepository } from './hesap-hareketi.repository';
import { Connection } from 'typeorm';

@Injectable()
export class HesapHareketiService extends BaseService<HesapHareketi> {


    constructor(repository: HesapHareketiRepository,
        private connection: Connection) {
        super(repository);
    }
    getListWithInnerModel(take?: number, skip?: number): Promise<[HesapHareketi[], number]> {
        //return this.repository.find();
        return this.repository.createQueryBuilder('hh')
            .addSelect('SUM (hh.tutar) OVER (PARTITION BY hh.hesapTanimiId ORDER BY hh.islemTarihi, hh.id)', 'hh_bakiye')
            .leftJoinAndSelect('hh.hesapTanimi', 'ht')
            .leftJoinAndSelect('hh.borc', 'b')
            .leftJoinAndSelect('hh.tahsilat', 't')
            .orderBy('hh.id', 'DESC')
            .take(take)
            .skip(skip)
            .getManyAndCount();
    }
    getHesapHareketleriByHesapId(hesapTanimiId: string): Promise<HesapHareketi[]> {
        return this.repository.createQueryBuilder('hh')
            .addSelect('SUM (hh.tutar) OVER (PARTITION BY hh.hesapTanimiId ORDER BY hh.islemTarihi, hh.id)', 'hh_bakiye')
            .leftJoinAndSelect('hh.hesapTanimi', 'ht')
            .leftJoinAndSelect('hh.borc', 'b')
            .leftJoinAndSelect('hh.tahsilat', 't')
            .orderBy('hh.id', 'DESC')
            .where('hh.hesapTanimiId = :hesapTanimiId', { hesapTanimiId })
            .getMany();
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
}
