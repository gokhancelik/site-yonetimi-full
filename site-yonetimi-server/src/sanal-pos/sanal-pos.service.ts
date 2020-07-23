import { Injectable } from '@nestjs/common';
import { BaseService } from '../abstract/base.service';
import { SanalPos } from './sanal-pos.entity';
import { SanalPosRepository } from './sanal-pos.repository';
import { Observable } from 'rxjs';

@Injectable()
export class SanalPosService extends BaseService<SanalPos>{

    constructor(repository: SanalPosRepository) {
        super(repository);
    }
    async getByKod(kod: string): Promise<SanalPos> {
        return this.repository.createQueryBuilder('sanalPos')
            .where('sanalPos.kod = :kod', { kod })
            .getOne();
    }
    async getAktif(): Promise<SanalPos> {
        return SanalPos.findOne({
            where: {
                aktifMi: true
            }
        });
    }
}
