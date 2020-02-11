import { Injectable } from '@nestjs/common';
import { Borc } from './Borc.entity';
import { BaseService } from '../abstract/base.service';
import { BorcRepository } from './borc.repository';

@Injectable()
export class BorcService extends BaseService<Borc> {
    constructor(repository: BorcRepository) {
        super(repository);
    }
 
}
