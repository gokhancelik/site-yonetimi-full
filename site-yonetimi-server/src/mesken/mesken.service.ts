import { Injectable } from '@nestjs/common';
import { Mesken } from './mesken.entity';
import { MeskenRepository } from './mesken.repository';
import { BaseService } from '../abstract/base.service';
import { MeskenAidatGrubu } from '../aidat-grubu/mesken-aidat-grubu.entity';
import { IsNull } from 'typeorm';

@Injectable()
export class MeskenService extends BaseService<Mesken> {
    constructor(repository: MeskenRepository) {
        super(repository);
    }
    async findByUstId(ustId: string): Promise<Mesken[]> {
        return (this.repository as MeskenRepository).findByUstId(ustId);
    }
    async assignAidatGrubu(id: string, aidatGrubuId: string, baslangicTarihi: Date): Promise<MeskenAidatGrubu> {
        let eskiler = await MeskenAidatGrubu.find({
            where: {
                bitisTarihi: IsNull(),
                meskenId: id
            }
        });
        for (const eski of eskiler) {
            eski.bitisTarihi = baslangicTarihi;
            eski.save();
        }
        let mag: MeskenAidatGrubu = new MeskenAidatGrubu();
        mag.meskenId = id;
        mag.aidatGrubuId = aidatGrubuId;
        mag.baslangicTarihi = baslangicTarihi;
        mag.save();
        return mag;
    }
    async findByUstMeskenId(meskenId: string): Promise<Mesken[]> {
        return this.repository.createQueryBuilder('m')
            .leftJoinAndSelect('m.meskenKisis', 'mk')
            .leftJoinAndSelect('mk.kisi', 'k')
            .where('m.ustId = :meskenId and mk.bitisTarihi is null', { meskenId: meskenId })
            .getMany();
    }
}
