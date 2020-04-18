import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { BagimsizBolum } from "../bagimsiz-bolum/bagimsiz-bolum.entity";
import { Kisi } from "../kisi/kisi.entity";
import { BaseEntity } from "../abstract/base.entity";

@Entity({ name: 'BagimsizBolumKisi' })
export class BagimsizBolumKisi extends BaseEntity {
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