import { Injectable } from '@nestjs/common';
import { BaseService } from '../abstract/base.service';
import { GelirGiderTanimi } from './gelir-gider-tanimi.entity';
import { GelirGiderTanimiRepository } from './gelir-gider-tanimi.repository';

@Injectable()
export class GelirGiderTanimiService extends BaseService<GelirGiderTanimi>{

    constructor(repository: GelirGiderTanimiRepository) {
        super(repository);
    }
}
