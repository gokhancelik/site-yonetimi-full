import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BankaTanim } from '../banka-tanim/banka-tanim.entity';
export enum HesapTipi {
    Kasa = 100,
    Banka = 102
}
@Entity({ name: 'HesapTanimi' })
export class HesapTanimi {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 50 })
    ad: string;

    @Column({ length: 500, nullable: true })
    aciklama: string;

    @Column({ type: 'int', nullable: false })
    hesapTipi!: HesapTipi;

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