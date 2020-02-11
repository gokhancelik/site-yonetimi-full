import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Tahsilat } from '../tahsilat/tahsilat.entity';
import { Borc } from '../borc/borc.entity';
import { GelirGiderTanimi } from '../gelir-gider-tanimi/gelir-gider-tanimi.entity';

@Entity({ name: 'HesapHareketi' })
export class HesapHareketi {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('datetime2')
    islemTarihi: Date;

    @Column({ type: 'uuid' })
    tahsilatId: string;

    @ManyToOne(type => Tahsilat)
    tahsilat: Tahsilat;

    @Column({ type: 'uuid' })
    borcId: string;

    @ManyToOne(type => Borc)
    borc: Borc;

    @Column({ type: 'uuid' })
    islemTipiId: string;

    @ManyToOne(type => GelirGiderTanimi)
    islemTipi!: GelirGiderTanimi;
    
    @Column({ type: 'money' })
    tutar: number;
}
