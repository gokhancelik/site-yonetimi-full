import { BaseEntity } from "src/abstract/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Kisi } from "../kisi/kisi.entity";
import { Rol } from "../rol/rol.entity";

@Entity({ name: 'KisiRol' })
export class KisiRol extends BaseEntity {
    @ManyToOne(type => Kisi, { nullable: false })
    kisi!: Kisi;

    @Column({ type: 'uuid', nullable: false })
    kisiId!: string;
    
    @ManyToOne(type => Rol, { nullable: false })
    rol!: Rol;

    @Column({ type: 'uuid', nullable: false })
    rolId!: string;
}