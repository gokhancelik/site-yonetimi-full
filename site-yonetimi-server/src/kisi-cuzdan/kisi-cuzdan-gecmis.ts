import { Entity, Column, ManyToOne } from "typeorm";
import { Tahsilat } from "../tahsilat/tahsilat.entity";
import { BaseEntity } from "../abstract/base.entity";

@Entity({ name: 'KisiCuzdanGecmis' })
export class KisiCuzdanGecmis extends BaseEntity {
    @Column({ type: 'money' })
    tutar: number;

    @Column({ type: 'uuid', nullable: true })
    tahsilatId?: string;

    @ManyToOne(() => Tahsilat)
    tahsilat?: Tahsilat;

}