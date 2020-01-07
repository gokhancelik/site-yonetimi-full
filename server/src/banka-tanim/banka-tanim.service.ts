import { Injectable } from '@nestjs/common';
import { BankaTanim } from './banka-tanim.entity';
import { BaseService } from '../abstract/base.service';
import { BankaTanimRepository } from './banka-tanim.repository';

@Injectable()
export class BankaTanimService extends BaseService<BankaTanim>{

    constructor(repository: BankaTanimRepository) {
        super(repository);
    }
}
