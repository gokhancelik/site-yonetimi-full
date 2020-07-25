import { Injectable } from '@nestjs/common';
import { Rol } from './rol.entity';
import { RolRepository } from './rol.repository';
import { BaseService } from '../abstract/base.service';

@Injectable()
export class RolService extends BaseService<Rol>{
    constructor(repository: RolRepository) {
        super(repository);
    }
}
