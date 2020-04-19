import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../abstract/base.entity';
import { Mesken } from '../mesken/mesken.entity';
@Entity({ name: 'MeskenTipi' })
export class MeskenTipi extends BaseEntity {
    @Column({ length: 500 })
    ad: string;

    @Column({ length: 50, nullable: true })
    kod: string;

    @Column({ type: 'nvarchar', nullable: true, length: 'MAX' })
    aciklama: string;

    @OneToMany(type => Mesken, bb => bb.meskenTipi)
    meskens: Mesken[];
}
