import { Injectable } from '@nestjs/common';
import { Kisi } from './kisi.entity';
import { BaseService } from '../abstract/base.service';
import { KisiRepository } from './kisi.repository'
@Injectable()
export class KisiService extends BaseService<Kisi>{
    constructor(repository: KisiRepository) {
        super(repository);
    }
    async findOneByUserName(username: string): Promise<Kisi> {
        return this.repository.createQueryBuilder('kisi')
            .innerJoin('kisi.meskenKisis', 'mk')
            .innerJoin('mk.mesken', 'm')
            .where('m.kod = :mKod', { mKod: username })
            .getOne();
    }

}
