import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { BagimsizBolumKisi } from "../bagimsiz-bolum-kisi/bagimsiz-bolum-kisi.entity";

@Entity({ name: 'Kisi' })
export class Kisi {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 50 })
    ad: string;

    @Column({ length: 50 })
    soyad: string;

    @Column({ length: 50, nullable: true })
    tcKimlikNo: string;

    @Column({ length: 50, nullable: true })
    telefon: string;

    @Column({ length: 50, nullable: true })
    cepTelefon: string;

    @Column({ length: 500, nullable: true })
    adres: string;

    @Column({ length: 100, nullable: true })
    eposta: string;

    @Column({ length: 100, nullable: true })
    sifre: string;

    @OneToMany(type => BagimsizBolumKisi, bbag => bbag.kisi)
    bagimsizBolumKisis!: BagimsizBolumKisi[];
}