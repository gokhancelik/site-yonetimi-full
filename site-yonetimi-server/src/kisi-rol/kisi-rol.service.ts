import { Injectable } from '@nestjs/common';
import { BaseService } from '../abstract/base.service';
import { KisiRol } from './kisi-rol.entity';
import { KisiRolRepository } from './kisi-rol.repository';

@Injectable()
export class KisiRolService  extends BaseService<KisiRol>{
    constructor(repository: KisiRolRepository) {
        super(repository);
    }
}