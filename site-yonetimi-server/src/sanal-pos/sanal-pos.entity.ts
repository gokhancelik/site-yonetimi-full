import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BankaTanim } from '../banka-tanim/banka-tanim.entity';
import { BaseEntity } from '../abstract/base.entity';
import { HesapTanimi } from '../hesap-tanimi/hesap-tanimi.entity';
import { ApiProperty } from '@nestjs/swagger';
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

    @Column({ nullable: true })
    ayarlar: string;

    @ManyToOne(type => BankaTanim, { nullable: true })
    hesap?: HesapTanimi;

    @Column({ type: 'uuid', nullable: true })
    hesapId?: string;
}