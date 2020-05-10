import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, OneToOne, ManyToMany } from "typeorm";
import { Tahsilat } from "../tahsilat/tahsilat.entity";
import { GelirGiderTanimi } from "../gelir-gider-tanimi/gelir-gider-tanimi.entity";
import { Tahakkuk } from "../tahakkuk/tahakkuk.entity";
import { BaseEntity } from "../abstract/base.entity";

@Entity({ name: 'TahsilatKalem' })
export class TahsilatKalem extends BaseEntity {
    @Column({ type: 'money' })
    tutar: number;

    @Column({ type: 'uuid' })
    tahsilatId: string;

    @ManyToOne(type => Tahsilat)
    tahsilat!: Tahsilat;

    @Column({ type: 'uuid' })
    odemeTipiId: string;

    @ManyToOne(type => GelirGiderTanimi, {
        eager: true
    })
    odemeTipi!: GelirGiderTanimi;

    @Column({ type: 'uuid', nullable: true })
    tahakkukId: string;

    @ManyToOne(type => Tahakkuk, { eager: true })
    tahakkuk?: Tahakkuk;
}