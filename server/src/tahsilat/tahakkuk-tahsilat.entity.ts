import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tahsilat } from "./tahsilat.entity";
import { Tahakkuk } from "../tahakkuk/tahakkuk.entity";

@Entity({ name: 'TahakkukTahsilat' })
export class TahakkukTahsilat {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    tahsilatId!: string;

    @ManyToOne(type => Tahsilat)
    tahsilat!: Tahsilat;

    @Column({ type: 'uuid' })
    tahakkukId!: string;

    @ManyToOne(type => Tahakkuk)
    tahakkuk!: Tahakkuk;
}