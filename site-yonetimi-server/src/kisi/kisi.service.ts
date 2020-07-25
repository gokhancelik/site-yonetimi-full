import { Injectable } from '@nestjs/common';
import { Kisi } from './kisi.entity';
import { BaseService } from '../abstract/base.service';
import { KisiRepository } from './kisi.repository'
import { Rol } from '../rol/rol.entity';
import { KisiRol } from '../kisi-rol/kisi-rol.entity';
@Injectable()
export class KisiService extends BaseService<Kisi>{

    constructor(repository: KisiRepository) {
        super(repository);
    }
    async findOneByUserName(username: string): Promise<Kisi> {
        return this.repository.createQueryBuilder('kisi')
            .leftJoin('kisi.meskenKisis', 'mk')
            .leftJoin('mk.mesken', 'm')
            .where('m.kod = :username OR kisi.eposta = :username', { username: username })
            .getOne();
    }
    async updateCurrentUser(userId: any, model: { telefon: string; cepTelefon: string; adres: string; eposta: string; tcKimlikNo: string; }): Promise<Kisi> {
        let user = await Kisi.findOne(userId);
        user.telefon = model.telefon;
        user.cepTelefon = model.cepTelefon;
        user.adres = model.adres;
        user.eposta = model.eposta;
        user.tcKimlikNo = model.tcKimlikNo;
        return user.save();
    }
    getRoles(id: string): Promise<KisiRol[]> {
        return KisiRol.find({
            join: {
                alias: 'kisiRol',
                innerJoinAndSelect: {
                    rol: 'kisiRol.rol',
                }
            },
            where: {
                kisiId: id
            }
        });
    }

}
