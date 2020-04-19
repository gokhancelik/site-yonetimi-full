import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { AidatGrubu } from './aidat-grubu.entity';
import { BaseEntity } from '../abstract/base.entity';
import { Mesken } from '../mesken/mesken.entity';
@Entity({ name: 'MeskenAidatGrubu' })
export class MeskenAidatGrubu extends BaseEntity {
    @Column({ type: 'uuid', nullable: false })
    meskenId!: string;

    @Column({ type: 'uuid', nullable: false })
    aidatGrubuId!: string;

    @Column({ type: 'date', nullable: false })
    baslangicTarihi!: Date;

    @Column({ type: 'date', nullable: true })
    bitisTarihi?: Date;

    @ManyToOne(type => Mesken, m => m.meskenAidatGrubus)
    mesken!: Mesken;

    @ManyToOne(type => AidatGrubu, ag => ag.meskenAidatGrubus)
    aidatGrubu!: AidatGrubu;
}