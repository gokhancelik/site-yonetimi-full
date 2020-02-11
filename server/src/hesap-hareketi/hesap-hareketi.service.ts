import { Injectable } from '@nestjs/common';
import { BaseService } from '../abstract/base.service';
import { HesapHareketi } from './hesap-hareketi.entity';
import { HesapHareketiRepository } from './hesap-hareketi.repository';

@Injectable()
export class HesapHareketiService extends BaseService<HesapHareketi> {
    constructor(repository: HesapHareketiRepository) {
        super(repository);
    }
 
}
