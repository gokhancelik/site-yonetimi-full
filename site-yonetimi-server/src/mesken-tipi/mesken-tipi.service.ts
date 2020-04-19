import { Injectable } from '@nestjs/common';
import { MeskenTipi } from './mesken-tipi.entity';
import { MeskenTipiRepository } from './mesken-tipi.repository';
import { BaseService } from '../abstract/base.service';
import { MeskenRepository } from '../mesken/mesken.repository';

@Injectable()
export class MeskenTipiService extends BaseService<MeskenTipi> {

    constructor(repository: MeskenTipiRepository, private meskenRepo: MeskenRepository) {
        super(repository);
    }
    findByKod(kod: string): Promise<MeskenTipi> {
        return this.repository.createQueryBuilder('meskenTipi')
            .where('meskenTipi.kod = :kod', { kod: kod })
            .getOne();
    }
    getMeskensByKod(kod: string): Promise<import("../mesken/mesken.entity").Mesken[]> {
        return this.meskenRepo.createQueryBuilder('mesken')
            .innerJoin('mesken.meskenTipi', 'mt')
            .where('mt.kod = :kod', { kod: kod })
            .getMany();
    }

}
