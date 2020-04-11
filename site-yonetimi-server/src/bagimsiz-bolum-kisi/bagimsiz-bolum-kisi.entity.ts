import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { BagimsizBolum } from "../bagimsiz-bolum/bagimsiz-bolum.entity";
import { Kisi } from "../kisi/kisi.entity";

@Entity({ name: 'BagimsizBolumKisi' })
export class BagimsizBolumKisi {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uniqueidentifier', nullable: false })
    bagimsizBolumId!: string;

    @Column({ type: 'uniqueidentifier', nullable: false })
    kisiId!: string;

    @Column({ type: 'date', nullable: false })
    baslangicTarihi!: Date;

    @Column({ type: 'date', nullable: true })
    bitisTarihi?: Date;

    @ManyToOne(type => BagimsizBolum, bb => bb.bagimsizBolumKisis)
    bagimsizBolum!: BagimsizBolum;

    @ManyToOne(type => Kisi, ag => ag.bagimsizBolumKisis)
    kisi!: Kisi;
}