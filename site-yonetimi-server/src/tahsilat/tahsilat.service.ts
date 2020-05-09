import { Injectable } from '@nestjs/common';
import { BaseService } from '../abstract/base.service';
import { Tahsilat, TahsilatDurumu, OdemeYontemi } from './tahsilat.entity';
import { TahsilatRepository } from './tahsilat.repository';
import { Tahakkuk } from '../tahakkuk/tahakkuk.entity';
import { Connection, Repository } from 'typeorm';
import { TahsilatKalem } from '../tahsilat-kalem/tahsilat-kalem.entity';
import { GelirGiderTanimiService } from '../gelir-gider-tanimi/gelir-gider-tanimi.service';
import { GelirGiderTanimi } from '../gelir-gider-tanimi/gelir-gider-tanimi.entity';
import { TahakkukService } from '../tahakkuk/tahakkuk.service';
import { TahsilatSanalPosLog } from './tahsilat-sanal-pos-log.entity';
import { TahsilatSanalPosLogRepository } from './tahsilat-sanal-pos-log.repository';

@Injectable()
export class TahsilatService extends BaseService<Tahsilat>{


    constructor(repository: TahsilatRepository,
        private readonly connection: Connection,
        private readonly tahakkukService: TahakkukService,
        private readonly tahsilatSanalPosLogRepository: TahsilatSanalPosLogRepository,
        private gelirGiderTanimiService: GelirGiderTanimiService
    ) {
        super(repository);
    }
    getTahsilatlarByUserId(userId: any): Promise<Tahsilat[]> {
        return this.repository.createQueryBuilder('tahsilat')
            .innerJoin('tahsilat.meskenKisi', 'mk')
            .where('mk.kisiId = :userId', { userId })
            .getMany();
    }
    getDagitilacakTahsilatlar(): Promise<Tahsilat[]> {
        return this.repository.createQueryBuilder('tahsilat')
            .innerJoinAndSelect('tahsilat.meskenKisi', 'mk')
            .innerJoinAndSelect('tahsilat.tahsilatKalems', 'tk')
            .innerJoinAndSelect('tk.odemeTipi', 'ot')
            .where('tahsilat.durumu = 0')
            .orderBy('tahsilat.odemeTarihi')
            // .andWhere('tahsilat.odemeYontemi <> 0')
            .getMany();
    }
    async krediKartiTahsilatiOlustur(tahakkuklar: Tahakkuk[]): Promise<Tahsilat> {
        return await this.connection.transaction(async manager => {
            let tahsilat = new Tahsilat();
            tahsilat.aciklama = tahakkuklar.map(m => m.aciklama).join(', ') + ' Ödemesi';
            tahsilat.durumu = TahsilatDurumu.Bekliyor;
            tahsilat.guncellemeTarihi = new Date();
            tahsilat.guncelleyen = 'username';
            tahsilat.meskenKisiId = tahakkuklar[0].meskenKisiId;
            tahsilat.odemeTarihi = new Date();
            tahsilat.odemeYontemi = OdemeYontemi.KrediKarti;
            tahsilat.olusturan = 'username';
            tahsilat.olusturmaTarihi = new Date();
            tahsilat.tahsilatKalems = [];
            for (const tahakkuk of tahakkuklar) {
                if (tahakkuk.hesaplananFaiz > 0) {
                    var faizKalemi = await this.faizKalemiOlustur(tahakkuk);
                    tahsilat.tahsilatKalems.push(faizKalemi);
                }
                var bankaKomisyonu = await this.bankaKomisyonuKalemiOlustur(tahakkuk);
                tahsilat.tahsilatKalems.push(bankaKomisyonu);
                var tahakkukTahsilatKalemi = new TahsilatKalem();
                tahakkukTahsilatKalemi.odemeTipiId = tahakkuk.odemeTipiId;
                tahakkukTahsilatKalemi.tahakkukId = tahakkuk.id;
                tahakkukTahsilatKalemi.tutar = tahakkuk.faizHaricOdenecekTutar;
                tahsilat.tahsilatKalems.push(tahakkukTahsilatKalemi);
            }
            tahsilat.tutar = tahsilat.tahsilatKalems.map(m => m.tutar).reduce((prev, current) => prev + current, 0);
            await manager.save(tahsilat);
            for (const thk of tahsilat.tahsilatKalems) {
                thk.tahsilatId = tahsilat.id;
                await manager.save(thk);
            }
            return tahsilat;
        });
    }
    async onayla(tahsilatId: string, bankaSiparisNo: string = null): Promise<Tahsilat> {
        let tahsilat = await this.findById(tahsilatId);
        let tahakkukIds: Array<{ tahakkukId: string, tutar: number }> = [];
        for (const tahsilatKalem of tahsilat.tahsilatKalems) {
            let tahakkukId = tahsilatKalem.tahakkukId;
            let tutar = tahsilatKalem.tutar;
            let tahakkuk = tahakkukIds.find(f => f.tahakkukId === tahakkukId);
            if (tahakkuk) {
                tahakkuk.tutar += tutar;
            } else {
                tahakkukIds.push({ tahakkukId: tahakkukId, tutar: tutar })
            }
        }
        for (const tahakkukId of tahakkukIds) {
            await this.tahakkukService.odemeYap(tahakkukId.tahakkukId, tahakkukId.tutar);
        }
        tahsilat.bankaSiparisNo = bankaSiparisNo;
        tahsilat.durumu = TahsilatDurumu.Onaylandi;
        return tahsilat;
    }
    async sanalPosLogEkle(tahsilatId: string, log: string, durum: boolean): Promise<TahsilatSanalPosLog> {
        let entity = new TahsilatSanalPosLog();
        entity.tahsilatId = tahsilatId;
        entity.mesaj = log;
        entity.durum = durum;
        await this.tahsilatSanalPosLogRepository.insert(entity);
        return entity;
    }
    private async bankaKomisyonuKalemiOlustur(tahakkuk: Tahakkuk) {
        var tahsilatKalem = new TahsilatKalem();
        tahsilatKalem.tahakkukId = tahakkuk.id;
        tahsilatKalem.tutar = 0;
        tahsilatKalem.tahakkuk = tahakkuk;
        let gelirTanimi = await this.gelirGiderTanimiService.getByKod(GelirGiderTanimi.BankaKomisyonu);
        tahsilatKalem.odemeTipiId = gelirTanimi.id;
        tahsilatKalem.odemeTipi = gelirTanimi;
        return tahsilatKalem;
    }

    private async faizKalemiOlustur(tahakkuk: Tahakkuk) {
        var tahsilatKalem = new TahsilatKalem();
        tahsilatKalem.tahakkukId = tahakkuk.id;
        tahsilatKalem.tutar = tahakkuk.hesaplananFaiz;
        tahsilatKalem.tahakkuk = tahakkuk;
        let gelirTanimi = await this.gelirGiderTanimiService.getByKod(GelirGiderTanimi.Faiz);
        tahsilatKalem.odemeTipiId = gelirTanimi.id;
        tahsilatKalem.odemeTipi = gelirTanimi;
        return tahsilatKalem;
    }

}
