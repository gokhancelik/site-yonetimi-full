import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, OneToOne, ManyToMany } from "typeorm";
import { Tahsilat } from "../tahsilat/tahsilat.entity";
import { GelirGiderTanimi } from "../gelir-gider-tanimi/gelir-gider-tanimi.entity";
import { Tahakkuk } from "../tahakkuk/tahakkuk.entity";

@Entity({ name: 'TahsilatKalem' })
export class TahsilatKalem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'money' })
    tutar: number;

    @Column({ type: 'uuid' })
    tahsilatId: string;

    @ManyToOne(type => Tahsilat)
    tahsilat!: Tahsilat;

    @Column({ type: 'uuid' })
    odemeTipiId: string;

    @ManyToOne(type => GelirGiderTanimi)
    odemeTipi!: GelirGiderTanimi;

    @Column({ type: 'uuid' })
    tahakkukId: string;

    @ManyToOne(type => Tahakkuk)
    tahakkuk!: Tahakkuk;
}