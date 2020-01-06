import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Site } from '../site/site.entity';
import { BagimsizBolum } from '../bagimsiz-bolum/bagimsiz-bolum.entity';

@Entity({ name: 'Blok' })
export class Blok {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 500 })
    ad: string;

    @Column({ type: 'text', nullable: true })
    aciklama: string;

    @ManyToOne(type => Site, site => site.bloks)
    site: Site;

    @Column({ type: 'uuid' })
    siteId: string;

    @OneToMany(type => BagimsizBolum, bb => bb.blok)
    bagimsizBolums: BagimsizBolum[];
}
