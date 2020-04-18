import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BagimsizBolumAidatGrubu } from './bagimsiz-bolum-aidat-grubu.entity';
import { BaseEntity } from '../abstract/base.entity';

@Entity({ name: 'AidatGrubu' })
export class AidatGrubu extends BaseEntity {

    @Column({ length: 50 })
    ad: string;

    @Column({ length: 500, nullable: true })
    aciklama: string;

    @Column({ type: 'money', nullable: false })
    tutar: number;

    @OneToMany(type => BagimsizBolumAidatGrubu, bbag => bbag.aidatGrubu)
    bagimsizBolumAidatGrubus!: BagimsizBolumAidatGrubu[];
}