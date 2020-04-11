import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Tahsilat } from '../tahsilat/tahsilat.entity';
import { Borc } from '../borc/borc.entity';
import { HareketTipi } from '../gelir-gider-tanimi/gelir-gider-tanimi.entity';
import { HesapTanimi } from '../hesap-tanimi/hesap-tanimi.entity';

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

    @Column({ type: 'uuid', nullable: false })
    hesapTanimiId!: string;


    @ManyToOne(type => HesapTanimi)
    hesapTanimi!: HesapTanimi;

    
    constructor(islemTarihi:Date, hareketTipi: HareketTipi, tutar: number, hesapTanimiId: string, tahsilatId?:string, borcId?:string){
        this.islemTarihi = islemTarihi;
        this.tutar = tutar;
        this.hareketTipi = hareketTipi;
        this.tahsilatId = tahsilatId;
        this.borcId = borcId;
        this.hesapTanimiId = hesapTanimiId;
    }

}
