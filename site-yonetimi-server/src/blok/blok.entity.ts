import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Site } from '../site/site.entity';
import { BagimsizBolum } from '../bagimsiz-bolum/bagimsiz-bolum.entity';
import { Borc } from '../borc/borc.entity';

@Entity({ name: 'Blok' })
export class Blok {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 500 })
    ad: string;

    @Column({ length: 50, nullable: true })
    kod: string;

    @Column({ type: 'nvarchar', nullable: true, length: 'MAX' })
    aciklama: string;

    @ManyToOne(type => Site, site => site.bloks)
    site: Site;

    @Column({ type: 'uuid' })
    siteId: string;

    @OneToMany(type => BagimsizBolum, bb => bb.blok)
    bagimsizBolums: BagimsizBolum[];

    @OneToMany(type => Borc, bb => bb.blok)
    borclar: Borc[];
}
