import { Entity, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "../abstract/base.entity";
import { Tahsilat } from "./tahsilat.entity";
import { SanalPos } from "../sanal-pos/sanal-pos.entity";

@Entity({ name: 'TahsilatSanalPosLog' })
export class TahsilatSanalPosLog extends BaseEntity {
    @Column({ type: 'uuid' })
    tahsilatId: string;

    @ManyToOne(type => Tahsilat, { eager: true })
    tahsilat!: Tahsilat;

    @Column({ type: 'nvarchar', nullable: true, length: 'MAX' })
    mesaj: string = '';

    @Column({ default: false })
    durum: boolean;
}