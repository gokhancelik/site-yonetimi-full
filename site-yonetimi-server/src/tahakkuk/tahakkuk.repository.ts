import { EntityRepository, Repository, SelectQueryBuilder, LessThanOrEqual } from 'typeorm';
import { Tahakkuk, AidatDurumu } from './tahakkuk.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { TahsilatDurumu } from '../tahsilat/tahsilat.entity';

@EntityRepository(Tahakkuk)
export class TahakkukRepository extends BaseRepository<Tahakkuk> {
    public async findAll(): Promise<Tahakkuk[]> {
        var aidatlar$ = this.find({
            join: {
                alias: 'tahakkuk',
                leftJoinAndSelect: {
                    meskenKisi: 'tahakkuk.meskenKisi',
                    odemeTipi: 'tahakkuk.odemeTipi',
                    tahsilatKalems: 'tahakkuk.tahsilatKalems',
                    tahsilat: 'tahsilatKalems.tahsilat'
                }
            },
            order: {
                vadeTarihi: 'DESC'
            },
        })
        return aidatlar$;
    }

    public async getOdenmemisAidatlar(userId): Promise<Tahakkuk[]> {
        let today = new Date();
        let gelecekAy = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        var aidatlar$ =
            this.find({
                join: {
                    alias: 'tahakkuk',
                    leftJoinAndSelect: {
                        tahsilatKalems: 'tahakkuk.tahsilatKalems',
                        tahsilat: 'tahsilatKalems.tahsilat',
                        meskenKisi: 'tahakkuk.meskenKisi',
                        odemeTipi: 'tahakkuk.odemeTipi',
                        tahsilatKalemOdemeTipi: 'tahsilatKalems.odemeTipi'
                    },
                },
                where: (qb: SelectQueryBuilder<Tahakkuk>) => {
                    qb.where({
                        durumu: AidatDurumu.Odenmedi,
                        vadeTarihi: LessThanOrEqual(gelecekAy)
                    }).andWhere(
                        'meskenKisi.kisiId = :userId', { userId }
                    )
                },
                order: {
                    vadeTarihi: 'ASC'
                }
            })
        return aidatlar$;
    }
    public async getOdenmisAidatlar(userId: any): Promise<Tahakkuk[]> {
        var aidatlar$ =
            this.find({
                join: {
                    alias: 'tahakkuk',
                    innerJoinAndSelect: {
                        meskenKisi: 'tahakkuk.meskenKisi',
                        odemeTipi: 'tahakkuk.odemeTipi',
                        tahsilatKalems: 'tahakkuk.tahsilatKalems',
                        tahsilat: 'tahsilatKalems.tahsilat'
                    }
                },
                where: (qb: SelectQueryBuilder<Tahakkuk>) => {
                    qb.where({
                        durumu: AidatDurumu.Odendi,
                    }).andWhere(
                        'meskenKisi.kisiId = :userId', { userId }
                    ).andWhere(
                        'tahsilat.durumu = :tahsilatDurumu', { tahsilatDurumu: TahsilatDurumu.Onaylandi }
                    )
                },
                order: {
                    vadeTarihi: 'DESC'
                }
            })
        return aidatlar$;
    }
}
