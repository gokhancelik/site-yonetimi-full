import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BankaTanim } from '../banka-tanim/banka-tanim.entity';
import { BaseEntity } from '../abstract/base.entity';
import { HesapTanimi } from '../hesap-tanimi/hesap-tanimi.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
export enum HesapTipi {
    Kasa = 100,
    Banka = 102
}
@Entity({ name: 'SanalPos' })
export class SanalPos extends BaseEntity {
    @ApiProperty({ name: 'ad' })
    @Column({ length: 50 })
    ad: string;

    @Column({ length: 50 })
    kod: string;

    @Column({ nullable: true, length: 'MAX' })
    ayarlar: string;
    @Expose()
    get ayarlarParsed() {
        try {
            return JSON.parse(this.ayarlar);
        }
        catch (error) {
            return this.ayarlar;
        }
    }

    @Column({ type: 'decimal', nullable: true, scale: 5, precision: 5 })
    komisyon: number;

    @ManyToOne(type => HesapTanimi, { nullable: true, eager: true })
    hesap?: HesapTanimi;

    @Column({ type: 'uuid', nullable: true })
    hesapId?: string;

    @Column({ type: 'bit', nullable: false, default: false })
    aktifMi: boolean;
}