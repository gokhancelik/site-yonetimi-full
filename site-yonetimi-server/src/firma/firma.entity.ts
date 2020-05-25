import { Entity, Column } from "typeorm";
import { BaseEntity } from "../abstract/base.entity";

@Entity({ name: 'Firma' })
export class Firma extends BaseEntity {
    @Column({ length: 50 })
    ad: string;

    @Column({ length: 20 })
    kod: string;

    @Column({ length: 50, nullable: true })
    telefon: string;

    @Column({ length: 50, nullable: true })
    adres: string;
}