import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { GelirGiderTanimi } from "../gelir-gider-tanimi/gelir-gider-tanimi.entity";
import { Expose } from "class-transformer";
import { BaseEntity } from "../abstract/base.entity";
import { MeskenKisi } from "../mesken-kisi/mesken-kisi.entity";
export enum AidatDurumu {
    Odenmedi,
    Odendi,
    Icrada
}
@Entity({ name: 'Tahakkuk' })
export class Tahakkuk extends BaseEntity {
    @Column('datetime2')
    vadeTarihi: Date;

    //Faiz hesaplaması icin kullanilir
    odemeTarihi?: Date;

    @Column({ type: 'nvarchar', nullable: true, length: 'MAX' })
    aciklama: string;

    @Column({ type: 'money' })
    tutar: number;

    @Column({ type: 'money', nullable: true })
    odenenTutar?: number;

    @Column({ type: 'datetime', nullable: true })
    sonTahsilatTarihi?: Date;

    @Column({ type: 'money' })
    faizOrani: number;

    @Column({ type: 'uuid' })
    odemeTipiId: string;

    @ManyToOne(type => GelirGiderTanimi, { eager: true })
    odemeTipi!: GelirGiderTanimi;

    @Column({ type: 'uuid' })
    meskenKisiId: string;

    @ManyToOne(type => MeskenKisi, { eager: true })
    meskenKisi!: MeskenKisi;

    @Column({ type: 'int' })
    durumu: AidatDurumu;

    @Expose()
    public get odenecekTutar(): number {
        return this.tutar - this.odenenTutar + this.faiz;
    }
    @Expose()
    public get faiz(): number {
        if (!this.odemeTarihi) {
            this.odemeTarihi = new Date();
        }
        if (this.durumu == AidatDurumu.Icrada)
            return 0;
        var tarih = this.vadeTarihi;
        if (this.sonTahsilatTarihi && this.sonTahsilatTarihi > this.vadeTarihi) {
            tarih = this.sonTahsilatTarihi;
        }
        var gunSayisi = ((this.odemeTarihi.getTime() - tarih.getTime()) / (1000 * 3600 * 24));
        var ay = Math.floor(gunSayisi) / 30;
        var faiz = (this.tutar - this.odenenTutar) * this.faizOrani * (ay > 0 ? ay : 0);
        if (faiz > 0)
            return faiz;
        return 0;
    }
}