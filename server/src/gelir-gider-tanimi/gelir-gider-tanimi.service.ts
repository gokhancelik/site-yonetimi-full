import { Injectable } from '@nestjs/common';
import { BaseService } from '../abstract/base.service';
import { GelirGiderTanimi } from './gelir-gider-tanimi.entity';
import { GelirGiderTanimiRepository } from './gelir-gider-tanimi.repository';
import { EntityManager, TransactionManager } from 'typeorm';

@Injectable()
export class GelirGiderTanimiService extends BaseService<GelirGiderTanimi>{

    constructor(repository: GelirGiderTanimiRepository) {
        super(repository);
    }
    getByKod(kod: string): Promise<GelirGiderTanimi> {
        return (this.repository as GelirGiderTanimiRepository).getByKod(kod);
    }
}
