import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tahsilat } from "./tahsilat.entity";
import { GelirGiderTanimi } from "../gelir-gider-tanimi/gelir-gider-tanimi.entity";

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
}