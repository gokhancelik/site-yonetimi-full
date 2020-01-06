import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Site } from '../site/site.entity';

@Entity()
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
}
