import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Blok } from '../blok/blok.entity';
import { BagimsizBolumAidatGrubu } from '../aidat-grubu/bagimsiz-bolum-aidat-grubu.entity';

@Entity({name:'BagimsizBolum'})
export class BagimsizBolum {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 50 })
    ad: string;

    @Column({ length: 50 })
    kod: string;

    @Column({ type: 'text', nullable: true })
    aciklama: string;

    @ManyToOne(type => Blok, blok => blok.bagimsizBolums)
    blok: Blok;

    @Column({ type: 'uuid' })
    blokId: string;

    @OneToMany(type => BagimsizBolumAidatGrubu, bbag => bbag.bagimsizBolum)
    bagimsizBolumAidatGrubus!: BagimsizBolumAidatGrubu[];
}