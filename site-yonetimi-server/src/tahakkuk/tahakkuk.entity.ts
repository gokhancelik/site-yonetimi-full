import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, OneToMany, JoinColumn } from "typeorm";
import { GelirGiderTanimi } from "../gelir-gider-tanimi/gelir-gider-tanimi.entity";
import { Expose } from "class-transformer";
import { BaseEntity } from "../abstract/base.entity";
import { MeskenKisi } from "../mesken-kisi/mesken-kisi.entity";
import { TahsilatKalem } from "../tahsilat-kalem/tahsilat-kalem.entity";
import { TahsilatDurumu, Tahsilat } from "../tahsilat/tahsilat.entity";
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
    @JoinColumn()
    meskenKisiId: string;
    @ManyToOne(type => MeskenKisi, { eager: true })
    @JoinTable()
    meskenKisi!: MeskenKisi;
    @Column({ type: 'int' })
    durumu: AidatDurumu;
    @OneToMany(type => TahsilatKalem, t => t.tahakkuk, { nullable: true, eager: true })
    @JoinTable()
    tahsilatKalems?: TahsilatKalem[];

    @Expose()
    public get odenenTutar(): number {
        let odenenTutar = this.tahsilatKalems && this.tahsilatKalems.filter(p => p.tahsilat && p.tahsilat.durumu === TahsilatDurumu.Onaylandi).map(p => p.tutar).reduce((p, c) => p + c, 0);
        return Number(odenenTutar.toFixed(3));
    }
    @Expose()
    public get odenenFaiz(): number {
        let odenenFaiz = this.tahsilatKalems.filter(p => {
            return p.odemeTipi && p.odemeTipi.kod === GelirGiderTanimi.Faiz;
        }).map(p => p.tutar)
            .reduce((p, c) => p + c, 0);
        return Number(odenenFaiz.toFixed(3));
    }
    // @Expose()
    // public get odenenTutarAnaPara(): number {
    //     let odenenTutarAnaPara = this.odenenTutar - this.faizHaricOdenenTutar;
    //     return Number(odenenTutarAnaPara.toFixed(3));
    // }
    @Expose()
    public get kalanAnaPara(): number {
        let kalanAnaPara = this.tutar - this.odenenTutarAnaPara;
        kalanAnaPara = kalanAnaPara > 0 && this.durumu === AidatDurumu.Odenmedi ? kalanAnaPara : 0;
        return Number(kalanAnaPara.toFixed(3));
    }
    @Expose()
    public get odenenTutarAnaPara(): number {
        let faizHaricOdenenTutar = this.tahsilatKalems.filter(p => {
            return p.odemeTipi && p.odemeTipi.kod !== GelirGiderTanimi.Faiz && p.odemeTipi.kod !== GelirGiderTanimi.BankaKomisyonu;
        }).map(p => p.tutar)
            .reduce((p, c) => p + c, 0);
        return Number(faizHaricOdenenTutar.toFixed(3));
    }
    @Expose()
    public get sonTahsilatTarihi(): Date {
        return this.sonTahsilat && this.sonTahsilat.odemeTarihi;
    }
    @Expose()
    public get sonTahsilat(): Tahsilat {
        let sonTahsilatKalem = this.tahsilatKalems && this.tahsilatKalems.length ? this.tahsilatKalems.filter(p => p.tahsilat && p.tahsilat.durumu === TahsilatDurumu.Onaylandi).sort((a, b) => b.tahsilat.odemeTarihi.getTime() - a.tahsilat.odemeTarihi.getTime())[0] : null;
        return sonTahsilatKalem && sonTahsilatKalem.tahsilat;
    }
    @Expose()
    public get faiz(): number {
        var faiz = 0;
        if (this.durumu == AidatDurumu.Icrada)
            return faiz;
        var tarih = this.vadeTarihi;
        if (this.sonTahsilatTarihi && this.sonTahsilatTarihi > this.vadeTarihi) {
            tarih = this.sonTahsilatTarihi;
        }
        var gunSayisi = ((this.odemeTarihi.getTime() - tarih.getTime()) / (1000 * 3600 * 24));
        var ay = Math.floor(gunSayisi) / 30;
        faiz = (this.kalanAnaPara) * this.faizOrani * (ay > 0 ? ay : 0);
        faiz = faiz > 0 && this.durumu === AidatDurumu.Odenmedi ? faiz : 0;
        return Number(faiz.toFixed(3));
    }
    /**
     * faiz hesabi icin kullanilir. Veritabaninda karsiligi yoktur.
     */
    odemeTarihi: Date = new Date();
}