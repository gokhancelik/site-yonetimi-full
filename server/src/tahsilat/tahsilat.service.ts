import { Injectable } from '@nestjs/common';
import { BaseService } from '../abstract/base.service';
import { Tahsilat } from './tahsilat.entity';
import { TahsilatRepository } from './tahsilat.repository';

@Injectable()
export class TahsilatService extends BaseService<Tahsilat>{

    constructor(repository: TahsilatRepository) {
        super(repository);
    }
}
