import { Injectable } from '@nestjs/common';
import { AidatGrubu } from './aidat-grubu.entity';
import { BaseService } from '../abstract/base.service';
import { AidatGrubuRepository } from './aidat-grubu.repository';

@Injectable()
export class AidatGrubuService extends BaseService<AidatGrubu>{

    constructor(repository: AidatGrubuRepository) {
        super(repository);
    }
}
