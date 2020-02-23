import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Borc } from '../borc/borc.model';
export enum HareketTipi {
    Gelir = 1,
    Gider = 2,
    GelirGider = 3
}
export class HesapHareketi {
    id: string;
    islemTarihi: Date;
    tahsilatId?: string;
    borcId?: string;
    tutar: number;
    hareketTipi: HareketTipi;
    hesapTanimiId: string;
    borc?: Borc;
}
