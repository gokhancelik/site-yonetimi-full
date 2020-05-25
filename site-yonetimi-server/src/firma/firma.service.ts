import { Injectable } from '@nestjs/common';
import { BaseService } from '../abstract/base.service';
import { Firma } from './firma.entity';
import { FirmaRepository } from './firma.repository';
@Injectable()
export class FirmaService extends BaseService<Firma>{
    constructor(repository: FirmaRepository) {
        super(repository);
    }
}
