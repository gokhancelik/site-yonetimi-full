import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
@Entity({ name: 'BankaTanim' })
export class BankaTanim {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 50 })
    ad: string;
}