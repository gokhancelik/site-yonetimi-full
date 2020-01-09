import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from '../site/site.entity';
import { Blok } from '../blok/blok.entity';
import { BagimsizBolum } from '../bagimsiz-bolum/bagimsiz-bolum.entity';
import { AidatGrubu } from '../aidat-grubu/aidat-grubu.entity';
import { FaizGrubu } from '../faiz-grubu/faiz-grubu.entity';
import { BagimsizBolumAidatGrubu } from '../aidat-grubu/bagimsiz-bolum-aidat-grubu.entity';
import { GelirGiderTanimi } from '../gelir-gider-tanimi/gelir-gider-tanimi.entity';
import { BankaTanim } from '../banka-tanim/banka-tanim.entity';
import { HesapTanimi } from '../hesap-tanimi/hesap-tanimi.entity';
import { Kisi } from '../kisi/kisi.entity';
import { BagimsizBolumKisi } from '../bagimsiz-bolum-kisi/bagimsiz-bolum-kisi.entity';
import { Tahakkuk } from '../tahakkuk/tahakkuk.entity';
import { Tahsilat } from '../tahsilat/tahsilat.entity';
import { TahakkukTahsilat } from '../tahsilat/tahakkuk-tahsilat.entity';
import { TahsilatKalem } from '../tahsilat/tahsilat-kalem.entity';

@Module({
    imports: [
        // TypeOrmModule.forRoot({
        //     type: 'mssql',
        //     host: 'localhost',
        //     port: 7010,
        //     username: 'sa',
        //     password: 'qwe123**',
        //     database: 'zsity',
        //     entities: [
        //         Site,
        //         Blok
        //     ],
        //     synchronize: true,
        // }),
        TypeOrmModule.forRoot({
            type: 'mssql',

            // host: 'localhost',
            // port: 7010,
            // username: 'sa',
            // password: 'qwe123**',
            // database: 'zsity',

            host: '94.73.148.5',
            port: 1433,
            username: 'u8998566_uZSitY',
            password: '4g3QRqNxMAAgTp3',
            database: 'u8998566_zsity',

            entities: [
                Site,
                Blok,
                BagimsizBolum,
                AidatGrubu,
                FaizGrubu,
                BagimsizBolumAidatGrubu,
                GelirGiderTanimi,
                BankaTanim,
                HesapTanimi,
                Kisi,
                BagimsizBolumKisi,
                Tahakkuk,
                Tahsilat,
                TahakkukTahsilat,
                TahsilatKalem
            ],
            synchronize: true,
        })
    ],
    exports: []
})
export class DatabaseModule { }
