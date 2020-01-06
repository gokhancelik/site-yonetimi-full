import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from '../site/site.entity';
import { Blok } from '../blok/blok.entity';
import { BagimsizBolum } from '../bagimsiz-bolum/bagimsiz-bolum.entity';
import { AidatGrubu } from '../aidat-grubu/aidat-grubu.entity';
import { FaizGrubu } from '../faiz-grubu/faiz-grubu.entity';
import { BagimsizBolumAidatGrubu } from '../aidat-grubu/bagimsiz-bolum-aidat-grubu.entity';

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
                BagimsizBolumAidatGrubu
            ],
            synchronize: true,
        })
    ],
})
export class DatabaseModule { }
