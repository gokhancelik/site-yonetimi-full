import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Blok } from '../blok/blok.entity';
import { BaseEntity } from '../abstract/base.entity';

@Entity({ name: 'Site' })
export class Site extends BaseEntity {
  @Column({ type: 'nvarchar', length: 500 })
  ad: string;

  @Column({ type: 'nvarchar', nullable: true, length: 'MAX' })
  aciklama: string;

  @OneToMany(type => Blok, blok => blok.site)
  bloks: Blok[];
}
