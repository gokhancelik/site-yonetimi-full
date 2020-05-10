import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { BaseEntity } from "../abstract/base.entity";
import { MeskenKisi } from "../mesken-kisi/mesken-kisi.entity";
import { Expose } from "class-transformer";

@Entity({ name: 'Kisi' })
export class Kisi extends BaseEntity {
    @Column({ length: 50 })
    ad: string;

    @Column({ length: 50 })
    soyad: string;
    @Expose()
    get tamAd(): string {
        return `${this.ad} ${this.soyad}`;
    }
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

    @OneToMany(type => MeskenKisi, mk => mk.kisi)
    meskenKisis!: MeskenKisi[];
}