import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Blok } from '../blok/blok.entity';
import { BagimsizBolumAidatGrubu } from '../aidat-grubu/bagimsiz-bolum-aidat-grubu.entity';
import { BagimsizBolumKisi } from '../bagimsiz-bolum-kisi/bagimsiz-bolum-kisi.entity';
import { BaseEntity } from '../abstract/base.entity';

@Entity({ name: 'BagimsizBolum' })
export class BagimsizBolum extends BaseEntity {
    @Column({ length: 50 })
    ad: string;

    @Column({ length: 50 })
    kod: string;

    @Column({ type: 'nvarchar', nullable: true, length: 'MAX' })
    aciklama: string;

    @ManyToOne(type => Blok, blok => blok.bagimsizBolums)
    blok: Blok;

    @Column({ type: 'uuid' })
    blokId: string;

    @OneToMany(type => BagimsizBolumAidatGrubu, bbag => bbag.bagimsizBolum)
    bagimsizBolumAidatGrubus!: BagimsizBolumAidatGrubu[];

    @OneToMany(type => BagimsizBolumKisi, bbag => bbag.bagimsizBolum)
    bagimsizBolumKisis!: BagimsizBolumKisi[];
}