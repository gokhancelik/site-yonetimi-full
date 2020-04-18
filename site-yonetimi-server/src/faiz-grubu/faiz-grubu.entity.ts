import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../abstract/base.entity';

@Entity({ name: 'FaizGrubu' })
export class FaizGrubu extends BaseEntity {
    @Column({ length: 50 })
    ad: string;

    @Column({ length: 500, nullable: true })
    aciklama: string;

    @Column({ type: 'decimal', nullable: false, scale: 5, precision: 5 })
    oran: number;

}