import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
export enum HareketTipi {
    Gelir = 1,
    Gider = 2,
    GelirGider = 3
}
@Entity({ name: 'GelirGiderTanimi' })
export class GelirGiderTanimi {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 50 })
    ad: string;

    @Column({ length: 500, nullable: true })
    aciklama: string;

    @Column({ type: 'int', nullable: false })
    hareketTipi!: HareketTipi;
}