import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../abstract/base.entity';
import { MeskenAidatGrubu } from './mesken-aidat-grubu.entity';

@Entity({ name: 'AidatGrubu' })
export class AidatGrubu extends BaseEntity {

    @Column({ length: 50 })
    ad: string;

    @Column({ length: 500, nullable: true })
    aciklama: string;

    @Column({ type: 'money', nullable: false })
    tutar: number;

    @OneToMany(type => MeskenAidatGrubu, mag => mag.aidatGrubu)
    meskenAidatGrubus!: MeskenAidatGrubu[];
}