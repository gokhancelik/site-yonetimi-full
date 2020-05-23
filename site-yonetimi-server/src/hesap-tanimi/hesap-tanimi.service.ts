import { Injectable } from '@nestjs/common';
import { BaseService } from '../abstract/base.service';
import { HesapTanimi } from './hesap-tanimi.entity';
import { HesapTanimiRepository } from './hesap-tanimi.repository';

@Injectable()
export class HesapTanimiService extends BaseService<HesapTanimi>{

    constructor(repository: HesapTanimiRepository) {
        super(repository);
    }
    findByAktarimId(aktarimId: string): Promise<HesapTanimi> {
        return this.repository.createQueryBuilder('ht')
            .where('ht.aktarimId = :aktarimId ', { aktarimId: aktarimId })
            .getOne();
    }

}
