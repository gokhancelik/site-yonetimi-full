import { Injectable } from '@nestjs/common';
import { BaseService } from '../abstract/base.service';
import { Tahakkuk } from './tahakkuk.entity';
import { TahakkukRepository } from './tahakkuk.repository';

@Injectable()
export class TahakkukService extends BaseService<Tahakkuk>{

    constructor(repository: TahakkukRepository) {
        super(repository);
    }
}
