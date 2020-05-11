import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../abstract/base.entity';
export enum HareketTipi {
    Gelir = 1,
    Gider = 2,
    GelirGider = 3
}
@Entity({ name: 'GelirGiderTanimi' })
export class GelirGiderTanimi extends BaseEntity {
    @Column({ length: 50 })
    ad: string;

    @Column({ length: 50, nullable: false, unique: true })
    kod: string;

    @Column({ length: 500, nullable: true })
    aciklama: string;

    @Column({ type: 'int', nullable: false })
    hareketTipi!: HareketTipi;

    public static readonly Faiz = 'FZ';
    public static readonly Emanet = 'Emanet';
    public static readonly BankaKomisyonu = '780.09';
}