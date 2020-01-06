import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'FaizGrubu' })
export class FaizGrubu {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 50 })
    ad: string;

    @Column({ length: 500, nullable: true })
    aciklama: string;

    @Column({ type: 'decimal', nullable: false })
    oran: number;

}