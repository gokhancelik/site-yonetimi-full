import { Injectable } from '@nestjs/common';
import { BaseService } from '../abstract/base.service';
import { FaizGrubu } from './faiz-grubu.entity';
import { FaizGrubuRepository } from './faiz-grubu.repository';

@Injectable()
export class FaizGrubuService extends BaseService<FaizGrubu>{

    constructor(repository: FaizGrubuRepository) {
        super(repository);
    }
}
