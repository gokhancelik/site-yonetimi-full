import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AidatGrubu } from '../aidat-grubu/aidat-grubu.entity';
import { FaizGrubu } from '../faiz-grubu/faiz-grubu.entity';
import { GelirGiderTanimi } from '../gelir-gider-tanimi/gelir-gider-tanimi.entity';
import { BankaTanim } from '../banka-tanim/banka-tanim.entity';
import { HesapTanimi } from '../hesap-tanimi/hesap-tanimi.entity';
import { Kisi } from '../kisi/kisi.entity';
import { Tahakkuk } from '../tahakkuk/tahakkuk.entity';
import { Tahsilat } from '../tahsilat/tahsilat.entity';
import { TahsilatKalem } from '../tahsilat-kalem/tahsilat-kalem.entity';
import { Borc } from '../borc/borc.entity';
import { HesapHareketi } from '../hesap-hareketi/hesap-hareketi.entity';
import { SanalPos } from 'src/sanal-pos/sanal-pos.entity';
import { MeskenKisi } from '../mesken-kisi/mesken-kisi.entity';
import { Mesken } from '../mesken/mesken.entity';
import { MeskenAidatGrubu } from '../aidat-grubu/mesken-aidat-grubu.entity';
import { MeskenTipi } from '../mesken-tipi/mesken-tipi.entity';
import { TahsilatSanalPosLog } from '../tahsilat/tahsilat-sanal-pos-log.entity';
import { Personel } from 'src/personel/personel.entity';
import { KurulTipi } from 'src/kurul-tipi/kurul-tipi.entity';
import { KurulUye } from 'src/kurul-uye/kurul-uye.entity';
import { KurulUyeTipi } from 'src/kurul-uye-tipi/kurul-uye-tipi.entity';
import { KisiCuzdan } from '../kisi-cuzdan/kisi-cuzdan.entity';
import { OdemeAktarimi } from '../odeme-islemleri/odeme-aktarimi.entity';
import { Firma } from 'src/firma/firma.entity';
import { Duyurular } from 'src/duyurular/duyurular.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mssql',

            // host: 'localhost',
            // port: 7010,
            // username: 'sa',
            // password: 'qwe123**',
            // database: 'zsity',
            options: {
                encrypt: false
            },
            host: '94.73.148.5',
            port: 1433,
            username: 'u8998566_uZSitY',
            password: '4g3QRqNxMAAgTp3',
            database: 'u8998566_zsity',
            entities: [
                Borc,
                AidatGrubu,
                FaizGrubu,
                GelirGiderTanimi,
                BankaTanim,
                HesapTanimi,
                HesapHareketi,
                Kisi,
                Mesken,
                MeskenKisi,
                MeskenAidatGrubu,
                Tahakkuk,
                Tahsilat,
                TahsilatKalem,
                SanalPos,
                MeskenTipi,
                TahsilatSanalPosLog,
                Personel,
                KurulTipi,
                KurulUye,
                KurulUyeTipi,
                KisiCuzdan,
                OdemeAktarimi,
                Firma,
                Duyurular
            ],
            synchronize: true,
            // logging: ""
        })
    ],
    exports: []
})
export class DatabaseModule { }
