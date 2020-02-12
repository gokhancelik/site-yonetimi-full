import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Tahsilat } from '../tahsilat/tahsilat.entity';
import { Borc } from '../borc/borc.entity';
import { HareketTipi } from '../gelir-gider-tanimi/gelir-gider-tanimi.entity';

@Entity({ name: 'HesapHareketi' })
export class HesapHareketi {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('datetime2')
    islemTarihi: Date;

    @Column({ type: 'uuid', nullable: true })
    tahsilatId?: string;

    @ManyToOne(type => Tahsilat)
    tahsilat?: Tahsilat;

    @Column({ type: 'uuid', nullable: true })
    borcId?: string;

    @ManyToOne(type => Borc)
    borc?: Borc;
    
    @Column({ type: 'money' })
    tutar: number;

    @Column({type: "int"})
    hareketTipi: HareketTipi;

    constructor(islemTarihi:Date, hareketTipi: HareketTipi, tutar: number, tahsilatId?:string, borcId?:string){
        this.islemTarihi = islemTarihi;
        this.tutar = tutar;
        this.hareketTipi = hareketTipi;
        this.tahsilatId = tahsilatId;
        this.borcId = borcId;
    }

}
