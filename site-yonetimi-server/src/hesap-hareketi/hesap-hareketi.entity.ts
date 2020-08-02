import { Entity, Column, ManyToOne } from 'typeorm';
import { Tahsilat } from '../tahsilat/tahsilat.entity';
import { Borc } from '../borc/borc.entity';
import { HesapTanimi } from '../hesap-tanimi/hesap-tanimi.entity';
import { BaseEntity } from '../abstract/base.entity';

@Entity({ name: 'HesapHareketi' })
export class HesapHareketi extends BaseEntity {
    @Column('datetime2')
    islemTarihi: Date;

    @Column({ type: 'uuid', nullable: true })
    tahsilatId?: string;

    @ManyToOne(() => Tahsilat)
    tahsilat?: Tahsilat;

    @Column({ type: 'uuid', nullable: true })
    borcId?: string;

    @ManyToOne(() => Borc)
    borc?: Borc;

    @Column({ type: 'money' })
    tutar: number;

    @Column({ type: 'money', default: 0, insert: false, readonly: true, select: false })
    bakiye: number;

    @Column({ type: 'uuid', nullable: false })
    hesapTanimiId!: string;

    @ManyToOne(() => HesapTanimi)
    hesapTanimi!: HesapTanimi;

    @Column({ nullable: true })
    aciklama: string;

    @Column({ nullable: true, length: 100 })
    dekontNo: string;

    static async olustur(islemTarihi: Date, tutar: number, hesapTanimiId: string, tahsilatId?: string, borcId?: string, aciklama?: string, dekontNo?: string): Promise<HesapHareketi> {
        let hesapHareketi = new HesapHareketi(islemTarihi, tutar, hesapTanimiId, tahsilatId, borcId, aciklama, dekontNo);
        return hesapHareketi.save();
    }

    constructor(islemTarihi: Date, tutar: number, hesapTanimiId: string, tahsilatId?: string, borcId?: string, aciklama?: string, dekontNo?: string) {
        super();
        this.islemTarihi = islemTarihi;
        this.tutar = tutar;
        this.tahsilatId = tahsilatId;
        this.borcId = borcId;
        this.hesapTanimiId = hesapTanimiId;
        this.aciklama = aciklama;
        this.dekontNo = dekontNo;
    }

}
