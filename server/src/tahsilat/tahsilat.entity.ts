import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { GelirGiderTanimi } from "../gelir-gider-tanimi/gelir-gider-tanimi.entity";
import { BagimsizBolumKisi } from "../bagimsiz-bolum-kisi/bagimsiz-bolum-kisi.entity";
export enum OdemeYontemi {
    HavaleEFT = 0,
    KrediKarti = 1,
    Kasa = 3,
    Devir = 4
}
export enum TahsilatDurumu {
    Bekliyor = 0,
    Onaylandi = 1,
    Hata = 2,
    Iptal = 3
}
@Entity({ name: 'Tahsilat' })
export class Tahsilat {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('date')
    odemeTarihi: Date;

    @Column({ type: 'text', nullable: true })
    aciklama: string;

    @Column({ type: 'money' })
    tutar: number;

    @Column({ type: 'uuid' })
    bagimsizBolumKisiId: string;

    @ManyToOne(type => BagimsizBolumKisi)
    bagimsizBolumKisi!: BagimsizBolumKisi;

    @Column({ type: 'int' })
    durumu: TahsilatDurumu;

    @Column({ type: 'int' })
    odemeYontemi: OdemeYontemi;

    @Column({ length: 50 })
    bankaSiparisNo: string;
}