import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BagimsizBolum } from '../bagimsiz-bolum/bagimsiz-bolum.entity';
import { AidatGrubu } from './aidat-grubu.entity';
import { BaseEntity } from '../abstract/base.entity';
export enum AidatGrubuAtandigiYer {
    Site = 1,
    Blok = 2,
    BagimsizBolum = 3
}
@Entity({ name: 'BagimsizBolumAidatGrubu' })
export class BagimsizBolumAidatGrubu extends BaseEntity {
    @Column({ type: 'uniqueidentifier', nullable: false })
    bagimsizBolumId!: string;

    @Column({ type: 'uniqueidentifier', nullable: false })
    aidatGrubuId!: string;

    @Column({ type: 'date', nullable: false })
    baslangicTarihi!: Date;

    @Column({ type: 'date', nullable: true })
    bitisTarihi?: Date;

    @ManyToOne(type => BagimsizBolum, bb => bb.bagimsizBolumAidatGrubus)
    bagimsizBolum!: BagimsizBolum;

    @ManyToOne(type => AidatGrubu, ag => ag.bagimsizBolumAidatGrubus)
    aidatGrubu!: AidatGrubu;

    @Column({ type: 'int', nullable: false })
    aidatGrubuAtandigiYer!: AidatGrubuAtandigiYer;
}