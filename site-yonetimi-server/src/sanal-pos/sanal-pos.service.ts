import { Injectable } from '@nestjs/common';
import { BaseService } from '../abstract/base.service';
import { SanalPos } from './sanal-pos.entity';
import { SanalPosRepository } from './sanal-pos.repository';

@Injectable()
export class SanalPosService extends BaseService<SanalPos>{

    constructor(repository: SanalPosRepository) {
        super(repository);
    }
}
