import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Mesken } from "../mesken/mesken.entity";
import { Kisi } from "../kisi/kisi.entity";
import { BaseEntity } from "../abstract/base.entity";

@Entity({ name: 'MeskenKisi' })
export class MeskenKisi extends BaseEntity {
    @Column({ type: 'uniqueidentifier', nullable: false })
    @JoinColumn()
    meskenId!: string;

    @Column({ type: 'uniqueidentifier', nullable: false })
    @JoinColumn()
    kisiId!: string;

    @Column({ type: 'date', nullable: false })
    baslangicTarihi!: Date;

    @Column({ type: 'date', nullable: true })
    bitisTarihi?: Date;

    @ManyToOne(type => Mesken, bb => bb.meskenKisis)
    mesken!: Mesken;

    @ManyToOne(type => Kisi, ag => ag.meskenKisis)
    kisi!: Kisi;
}