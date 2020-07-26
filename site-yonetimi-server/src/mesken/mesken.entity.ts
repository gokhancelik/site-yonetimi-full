import { Entity, Column, ManyToOne, OneToMany, Tree, TreeParent, TreeChildren } from 'typeorm';
import { Borc } from '../borc/borc.entity';
import { BaseEntity } from '../abstract/base.entity';
import { MeskenAidatGrubu } from '../aidat-grubu/mesken-aidat-grubu.entity';
import { MeskenKisi } from '../mesken-kisi/mesken-kisi.entity';
import { MeskenTipi } from '../mesken-tipi/mesken-tipi.entity';
@Entity({ name: 'Mesken' })
@Tree("nested-set")
export class Mesken extends BaseEntity {
    @Column({ length: 500 })
    ad: string;

    @Column({ length: 50, nullable: true })
    kod: string;

    @Column({ type: 'nvarchar', nullable: true, length: 'MAX' })
    aciklama: string;
    
    @TreeParent()
    // @ManyToOne(type => Mesken, ust => ust.alt)
    ust: Mesken;

    @Column({ type: 'uuid', nullable: true })
    ustId?: string;

    @TreeChildren()
    // @OneToMany(type => Mesken, bb => bb.ust, { eager: true })
    alt: Mesken[];

    @OneToMany(type => Borc, bb => bb.mesken)
    borclar: Borc[];

    @OneToMany(type => MeskenAidatGrubu, bbag => bbag.mesken, { eager: true })
    meskenAidatGrubus!: MeskenAidatGrubu[];

    @OneToMany(type => MeskenKisi, mk => mk.mesken)
    meskenKisis!: MeskenKisi[];

    @ManyToOne(type => MeskenTipi, mt => mt.meskens)
    meskenTipi: MeskenTipi;

    @Column({ type: 'uuid' })
    meskenTipiId: string;
}
