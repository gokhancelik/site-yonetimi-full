import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Blok } from "../blok/blok.entity";

export enum BorcDurumu {
    Odenmedi,
    Odendi,
    Icrada
}

@Entity({ name: 'Borc' })
export class Borc {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    blokId: string;
    
    @ManyToOne(type => Blok, blok => blok.borclar)
    blok: Blok;
    
    @Column('datetime2')
    vadeTarihi: Date;

    @Column({ type: 'text', nullable: true })
    aciklama: string;

    @Column({ type: 'money' })
    tutar: number;

    @Column({ type: 'money', nullable: true })
    odenenTutar?: number;

    @Column({ type: 'money' })
    faizOrani: number;

    @Column({ type: 'int' })
    durumu: BorcDurumu;
}