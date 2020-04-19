import { Injectable } from '@nestjs/common';
import { BaseService } from '../abstract/base.service';
import { MeskenKisi } from './mesken-kisi.entity';
import { MeskenKisiRepository } from './mesken-kisi.repository'
import { MeskenRepository } from '../mesken/mesken.repository';
@Injectable()
export class MeskenKisiService extends BaseService<MeskenKisi>{


    constructor(repository: MeskenKisiRepository) {
        super(repository);
    }
    async getAllWithKisi(): Promise<MeskenKisi[]> {
        return this.repository.createQueryBuilder('mk')
            .innerJoinAndSelect('mk.kisi', 'k')
            .getMany();
    }
    async getByKisiId(kisiId: string): Promise<MeskenKisi[]> {
        return this.repository.createQueryBuilder('mk')
            .innerJoinAndSelect('mk.mesken', 'm')
            .innerJoinAndSelect('mk.kisi', 'k')
            .where('mk.kisiId = :kisiId', { kisiId: kisiId })
            .getMany();
    }
    async getByMeskenId(meskenId: string): Promise<MeskenKisi[]> {
        return this.repository.createQueryBuilder('mk')
            .innerJoinAndSelect('mk.mesken', 'm')
            .innerJoinAndSelect('mk.kisi', 'k')
            .where('mk.meskenId = :meskenId', { meskenId: meskenId })
            .getMany();
    }
}
