import { Injectable } from '@nestjs/common';
import { Mesken } from './mesken.entity';
import { MeskenRepository } from './mesken.repository';
import { BaseService } from '../abstract/base.service';
import { MeskenAidatGrubu } from '../aidat-grubu/mesken-aidat-grubu.entity';

@Injectable()
export class MeskenService extends BaseService<Mesken> {
    constructor(repository: MeskenRepository) {
        super(repository);
    }
    async findByUstId(ustId: string): Promise<Mesken[]> {
        return (this.repository as MeskenRepository).findByUstId(ustId);
    }
    async assignAidatGrubu(id: string, aidatGrubuId: string, baslangicTarihi: Date): Promise<MeskenAidatGrubu[]> {
        let result = []
        let bbs = await this.findByUstId(id);
        for (let i = 0; i < bbs.length; i++) {
            const bb = bbs[i];
            let res = await this.assignAidatGrubu(bb.id, aidatGrubuId, baslangicTarihi);
            result.push(res);
        }
        return result;
    }
}
