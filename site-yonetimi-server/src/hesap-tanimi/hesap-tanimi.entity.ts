import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BankaTanim } from '../banka-tanim/banka-tanim.entity';
import { BaseEntity } from '../abstract/base.entity';
import { Mesken } from '../mesken/mesken.entity';
export enum HesapTipi {
    Kasa = 100,
    Banka = 102
}
@Entity({ name: 'HesapTanimi' })
export class HesapTanimi extends BaseEntity {
    @Column({ length: 50 })
    ad: string;

    @Column({ length: 500, nullable: true })
    aciklama: string;

    @Column({ type: 'int', nullable: false })
    hesapTipi!: HesapTipi;

    @ManyToOne(type => Mesken, { nullable: true })
    mesken?: Mesken;

    @Column({ type: 'uuid', nullable: true })
    meskenId?: string;

    @ManyToOne(type => BankaTanim, { nullable: true })
    banka?: BankaTanim;

    @Column({ type: 'uuid', nullable: true })
    bankaId?: string;

    @Column({ length: 500, nullable: true })
    hesapAdi?: string;

    @Column({ length: 50, nullable: true })
    subeKodu?: string;

    @Column({ length: 50, nullable: true })
    hesapNo?: string;

    @Column({ length: 50, nullable: true })
    iban?: string;
}