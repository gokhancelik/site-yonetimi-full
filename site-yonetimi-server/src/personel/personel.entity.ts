import { BaseEntity } from "src/abstract/base.entity";
import { Column, Entity, OneToMany, ManyToOne } from "typeorm";
import { Mesken } from "src/mesken/mesken.entity";
import { Kisi } from "src/kisi/kisi.entity";


@Entity({ name: 'Personel' })
export class Personel extends BaseEntity {

    @Column('datetime2')
    baslamaTarihi: Date;

    @Column('datetime2', { nullable: true })
    bitisTarihi: Date;

    @Column({ default: false })
    aktifMi: boolean;

    @ManyToOne(type => Mesken, { nullable: false })
    mesken!: Mesken;

    @Column({ type: 'uuid', nullable: false })
    meskenId!: string;

    @ManyToOne(type => Kisi, { nullable: false })
    kisi!: Kisi;

    @Column({ type: 'uuid', nullable: false })
    kisiId!: string; 
   
}