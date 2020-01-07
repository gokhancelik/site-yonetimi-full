import { Injectable } from '@nestjs/common';
import { Kisi } from './kisi.entity';
import { BaseService } from '../abstract/base.service';
import { KisiRepository } from './kisi.repository'
@Injectable()
export class KisiService extends BaseService<Kisi>{

    constructor(repository: KisiRepository) {
        super(repository);
    }
}
