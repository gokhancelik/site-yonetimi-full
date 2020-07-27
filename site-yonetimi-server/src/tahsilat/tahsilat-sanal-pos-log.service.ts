import { TahsilatSanalPosLog } from "./tahsilat-sanal-pos-log.entity";
import { BaseService } from "../abstract/base.service";
import { Injectable } from "@nestjs/common";
import { TahsilatSanalPosLogRepository } from "./tahsilat-sanal-pos-log.repository";
import { SelectQueryBuilder } from "typeorm";

@Injectable()
export class TahsilatSanalPosLogService extends BaseService<TahsilatSanalPosLog>{

    constructor(repository: TahsilatSanalPosLogRepository) {
        super(repository);
    }
    async getSonSanalPosLogByDurum(durum: boolean, kisiId: string): Promise<TahsilatSanalPosLog> {
        let sonuc = await TahsilatSanalPosLog.find({
            join: {
                alias: 'tspl',
                innerJoinAndSelect: {
                    tahsilat: 'tspl.tahsilat',
                    meskenKisi: 'tahsilat.meskenKisi',
                }
            },
            where: (qb: SelectQueryBuilder<TahsilatSanalPosLog>) => {
                qb.where(
                    'meskenKisi.kisiId = :kisiId AND tspl.durum = :durum', { kisiId, durum }
                )
            },
            // where: {
            //     durum: durum,
            //     tahsilat: {
            //         meskenKisi: {
            //             kisiId: kisiId
            //         }
            //     }
            // },
            take: 1,
            order: {
                olusturmaTarihi: 'DESC'
            }
        });
        return sonuc && sonuc.length && sonuc[0];
    }
}