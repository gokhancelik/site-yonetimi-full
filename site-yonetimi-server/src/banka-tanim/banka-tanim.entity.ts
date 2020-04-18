import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../abstract/base.entity';
@Entity({ name: 'BankaTanim' })
export class BankaTanim extends BaseEntity {
    @Column({ length: 50 })
    ad: string;
}