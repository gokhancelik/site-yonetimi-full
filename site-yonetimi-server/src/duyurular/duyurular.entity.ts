import { BaseEntity } from "src/abstract/base.entity";
import { Column, Entity, OneToMany, ManyToOne } from "typeorm";

@Entity({ name: 'Duyurular' })
export class Duyurular extends BaseEntity {

    @Column({ length: 250 })
    baslik!: string;

    @Column({ type: "nvarchar", length: "MAX" })
    icerik!: string;
}