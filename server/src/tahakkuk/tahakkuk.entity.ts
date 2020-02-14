import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { GelirGiderTanimi } from "../gelir-gider-tanimi/gelir-gider-tanimi.entity";
import { BagimsizBolumKisi } from "../bagimsiz-bolum-kisi/bagimsiz-bolum-kisi.entity";
export enum AidatDurumu {
    Odenmedi,
    Odendi,
    Icrada
}
@Entity({ name: 'Tahakkuk' })
export class Tahakkuk {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('datetime2')
    vadeTarihi: Date;

    @Column({ type: 'text', nullable: true })
    aciklama: string;

    @Column({ type: 'money' })
    tutar: number;

    @Column({ type: 'money', nullable: true })
    odenenTutar?: number;

    @Column({ type: 'datetime', nullable: true })
    sonTahsilatTarihi?: Date;

    @Column({ type: 'money' })
    faizOrani: number;

    @Column({ type: 'uuid' })
    odemeTipiId: string;

    @ManyToOne(type => GelirGiderTanimi, { eager: true })
    odemeTipi!: GelirGiderTanimi;

    @Column({ type: 'uuid' })
    bagimsizBolumKisiId: string;

    @ManyToOne(type => BagimsizBolumKisi, { eager: true })
    bagimsizBolumKisi!: BagimsizBolumKisi;

    @Column({ type: 'int' })
    durumu: AidatDurumu;
}