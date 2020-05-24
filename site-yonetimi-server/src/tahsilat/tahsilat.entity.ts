import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinTable } from "typeorm";
import { GelirGiderTanimi } from "../gelir-gider-tanimi/gelir-gider-tanimi.entity";
import { TahsilatKalem } from "../tahsilat-kalem/tahsilat-kalem.entity";
import { BaseEntity } from "../abstract/base.entity";
import { MeskenKisi } from "../mesken-kisi/mesken-kisi.entity";
import { Expose } from "class-transformer";
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
export class Tahsilat extends BaseEntity {
    @Column('datetime')
    odemeTarihi: Date;

    @Column({ type: 'nvarchar', nullable: true, length: 'MAX' })
    aciklama: string = '';

    @Column({ type: 'money' })
    tutar: number;

    @Column({ type: 'money', nullable: true })
    kullanilanTutar: number = 0;

    @Column({ type: 'uuid' })
    meskenKisiId: string;

    @ManyToOne(type => MeskenKisi, { eager: true })
    @JoinTable()
    meskenKisi!: MeskenKisi;

    @Column({ type: 'int' })
    durumu: TahsilatDurumu;

    @Column({ type: 'int' })
    odemeYontemi: OdemeYontemi;

    @Column({ length: 50, nullable: true })
    bankaSiparisNo: string;

    @OneToMany(type => TahsilatKalem, t => t.tahsilat, { nullable: true, eager: true })
    @JoinTable()
    tahsilatKalems?: TahsilatKalem[];

    @Expose()
    public get kullanilabilirMiktar(): number {
        return Number(this.tutar.toFixed(3)) - Number(this.kullanilanTutar.toFixed(3));
    }
}