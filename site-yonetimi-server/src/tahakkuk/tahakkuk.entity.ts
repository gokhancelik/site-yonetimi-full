import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, OneToMany } from "typeorm";
import { GelirGiderTanimi } from "../gelir-gider-tanimi/gelir-gider-tanimi.entity";
import { Expose } from "class-transformer";
import { BaseEntity } from "../abstract/base.entity";
import { MeskenKisi } from "../mesken-kisi/mesken-kisi.entity";
import { TahsilatKalem } from "../tahsilat-kalem/tahsilat-kalem.entity";
export enum AidatDurumu {
    Odenmedi,
    Odendi,
    Icrada
}
@Entity({ name: 'Tahakkuk' })
export class Tahakkuk extends BaseEntity {
    @Column('datetime2')
    vadeTarihi: Date;
    @Column({ type: 'nvarchar', nullable: true, length: 'MAX' })
    aciklama: string;
    @Column({ type: 'money' })
    tutar: number;
    @Column({ type: 'money' })
    faizOrani: number;
    @Column({ type: 'uuid' })
    odemeTipiId: string;
    @ManyToOne(type => GelirGiderTanimi, { eager: true })
    @JoinTable()
    odemeTipi!: GelirGiderTanimi;
    @Column({ type: 'uuid' })
    meskenKisiId: string;
    @ManyToOne(type => MeskenKisi, { eager: true })
    @JoinTable()
    meskenKisi!: MeskenKisi;
    @Column({ type: 'int' })
    durumu: AidatDurumu;
    @OneToMany(type => TahsilatKalem, t => t.tahakkuk, { nullable: true })
    @JoinTable()
    tahsilatKalems?: TahsilatKalem[];

    // @Expose()
    // public get odenecekTutar(): number {
    //     return this.faizHaricOdenecekTutar + this.hesaplananFaiz;
    // }
    // @Expose()
    // public get faizHaricOdenecekTutar(): number {
    //     return this.tutar - this.odenenTutar;
    // }
    // @Expose()
    // public get faizHaricOdenenTutar(): number {
    //     return this.tahsilatKalems.filter(p => {
    //         return p.odemeTipi.kod !== GelirGiderTanimi.Faiz && p.odemeTipi.kod !== GelirGiderTanimi.BankaKomisyonu;
    //     }).map(p => p.tutar)
    //         .reduce((p, c) => p + c, 0);
    // }
    // public get sonTahsilatTarihi(): Date {
    //     return this.tahsilatKalems && this.tahsilatKalems.length ? this.tahsilatKalems.map(m => Promise.resolve(m.tahsilat).odemeTarihi)).sort((a, b) => a.getTime() - b.getTime())[0] : null;
    // }
    // @Expose()
    // public get hesaplananFaiz(): number {
    //     var faiz = 0;
    //     if (!this.odemeTarihi) {
    //         this.odemeTarihi = new Date();
    //     }
    //     if (this.durumu == AidatDurumu.Icrada)
    //         return faiz;
    //     var tarih = this.vadeTarihi;
    //     if (this.sonTahsilatTarihi && this.sonTahsilatTarihi > this.vadeTarihi) {
    //         tarih = this.sonTahsilatTarihi;
    //     }
    //     var gunSayisi = ((this.odemeTarihi.getTime() - tarih.getTime()) / (1000 * 3600 * 24));
    //     var ay = Math.floor(gunSayisi) / 30;
    //     faiz = (this.tutar - this.faizHaricOdenenTutar) * this.faizOrani * (ay > 0 ? ay : 0);
    //     return faiz;
    // }
    // @Expose()
    // public get faiz(): number {
    //     return this.hesaplananFaiz + (this.odenenFaiz ? this.odenenFaiz : 0);
    // }
}