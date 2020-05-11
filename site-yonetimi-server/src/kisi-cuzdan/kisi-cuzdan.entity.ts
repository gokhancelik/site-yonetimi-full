import { Entity, Column, ManyToOne, JoinTable } from "typeorm";
import { Tahsilat } from "../tahsilat/tahsilat.entity";
import { BaseEntity } from "../abstract/base.entity";
import { MeskenKisi } from "../mesken-kisi/mesken-kisi.entity";

@Entity({ name: 'KisiCuzdan' })
export class KisiCuzdan extends BaseEntity {
    @Column({ type: 'money' })
    tutar: number;
    
    @Column({ type: 'uuid' })
    meskenKisiId: string;

    @ManyToOne(type => MeskenKisi, { eager: true })
    @JoinTable()
    meskenKisi!: MeskenKisi;
}