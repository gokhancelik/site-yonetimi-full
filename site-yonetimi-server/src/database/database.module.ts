import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
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
import { KisiRol } from '../kisi-rol/kisi-rol.entity';
import { Rol } from '../rol/rol.entity';
const entities = [
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
    Duyurular,
    KisiRol,
    Rol
]
const cigdemSql: TypeOrmModuleOptions = {
    type: 'mssql',
    options: {
        encrypt: false
    },
    host: '94.73.146.3',//'94.73.145.4',
    port: 1433,
    username: 'u8998566_sy_cgdm',//'u8998566_zsite',
    password: 'QKah55X1CMwc47I',//'SHKrw2jT4x8Vc4H',
    database: 'u8998566_sy_cgdm',//'u8998566_zsite',
    entities: entities,
    synchronize: true,
    //logging: 'all'
    // logging: ""
}
const testSql: TypeOrmModuleOptions = {
    type: 'mssql',
    options: {
        encrypt: false
    },
    host: '94.73.145.4',//'94.73.145.4',
    port: 1433,
    username: 'u8998566_sy_test',//'u8998566_zsite',
    password: 'GNka24G6NWcm54S',//'SHKrw2jT4x8Vc4H',
    database: 'u8998566_sy_test',//'u8998566_zsite',
    entities: entities,
    synchronize: true,
    // logging: 'all'
    // logging: ""
}
@Module({
    imports: [
        TypeOrmModule.forRoot(cigdemSql)
    ],
    exports: []
})
export class DatabaseModule { }
