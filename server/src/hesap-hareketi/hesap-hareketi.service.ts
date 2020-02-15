import { Injectable } from '@nestjs/common';
import { BaseService } from '../abstract/base.service';
import { HesapHareketi } from './hesap-hareketi.entity';
import { HesapHareketiRepository } from './hesap-hareketi.repository';

@Injectable()
export class HesapHareketiService extends BaseService<HesapHareketi> {
    constructor(repository: HesapHareketiRepository) {
        super(repository);
    }
    getListWithInnerModel(): Promise<HesapHareketi[]> {
        //return this.repository.find();
        return this.repository.createQueryBuilder('hh')
        .leftJoinAndSelect('hh.hesapTanimi', 'ht')
        .leftJoinAndSelect('hh.borc', 'b')
        .leftJoinAndSelect('hh.tahsilat', 't')
        .getMany();
    }
}
