import { Injectable } from '@nestjs/common';
import { BaseService } from '../abstract/base.service';
import { Tahsilat, TahsilatDurumu } from './tahsilat.entity';
import { TahsilatRepository } from './tahsilat.repository';
import { OdenmemisTahakkuk } from '../tahakkuk/odenmemis-tahakkuk.dto';
import { TahsilatKalem } from './tahsilat-kalem.entity';
import { GelirGiderTanimi } from '../gelir-gider-tanimi/gelir-gider-tanimi.entity';
import { GelirGiderTanimiService } from '../gelir-gider-tanimi/gelir-gider-tanimi.service';

@Injectable()
export class TahsilatService extends BaseService<Tahsilat>{


    constructor(repository: TahsilatRepository, private gelirGiderTanimiService: GelirGiderTanimiService) {
        super(repository);
    }
    getTahsilatlarByUserId(userId: any): Promise<Tahsilat[]> {
        return this.repository.createQueryBuilder('tahsilat')
            .innerJoin('tahsilat.bagimsizBolumKisi', 'bbk')
            .where('bbk.kisiId = :userId', { userId })
            .getMany();
    }
    async tahsilatOlustur(seciliTahakkuklar: OdenmemisTahakkuk[]): Promise<Tahsilat> {
        var tahsilat = new Tahsilat();
        tahsilat.durumu = TahsilatDurumu.Bekliyor;
        tahsilat.bagimsizBolumKisiId = seciliTahakkuklar[0].bagimsizBolumKisiId;
        tahsilat.tahsilatKalems = [];
        for (let i = 0; i < seciliTahakkuklar.length; i++) {
            const st = seciliTahakkuklar[i];
            var tahsilatKalem = new TahsilatKalem();
            tahsilatKalem.odemeTipi = st.odemeTipi;
            tahsilatKalem.odemeTipiId = st.odemeTipiId;
            tahsilatKalem.tahakkukId = st.id;
            tahsilatKalem.tutar = st.tutar - st.odenenTutar;
            tahsilat.tahsilatKalems.push(tahsilatKalem);
            if (st.faiz > 0) {
                var tahsilatKalem = new TahsilatKalem();
                tahsilatKalem.odemeTipiId = st.odemeTipiId;
                tahsilatKalem.tahakkukId = st.id;
                tahsilatKalem.tutar = st.faiz;
                let gelirTanimi = await this.gelirGiderTanimiService.getByKod(GelirGiderTanimi.Faiz);
                tahsilatKalem.odemeTipiId = gelirTanimi.id;
                tahsilatKalem.odemeTipi = gelirTanimi;
                tahsilat.tahsilatKalems.push(tahsilatKalem);
            }
            if (st.bankaKomisyonu > 0) {
                var tahsilatKalem = new TahsilatKalem();
                tahsilatKalem.odemeTipiId = st.odemeTipiId;
                tahsilatKalem.tahakkukId = st.id;
                tahsilatKalem.tutar = st.faiz;
                let gelirTanimi = await this.gelirGiderTanimiService.getByKod(GelirGiderTanimi.BankaKomisyonu);
                tahsilatKalem.odemeTipiId = gelirTanimi.id;
                tahsilatKalem.odemeTipi = gelirTanimi;
                tahsilat.tahsilatKalems.push(tahsilatKalem);
            }
        }
        tahsilat.tutar = tahsilat.tahsilatKalems.reduce((p, c) => p + c.tutar, 0);
        return tahsilat;
    }
}
