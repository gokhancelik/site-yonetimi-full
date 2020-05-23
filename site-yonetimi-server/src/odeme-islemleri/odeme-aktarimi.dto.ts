import { BaseEntity } from "../abstract/base.entity";
import { Column, PrimaryColumn, Entity } from "typeorm";
@Entity({ name: 'OdemeAktarimi' })
export class OdemeAktarimi extends BaseEntity {
    @Column({ nullable: true })
    bagimsizBolumKod: string;
    @Column({ type: 'datetime2', nullable: true })
    odemeTarihi: Date;
    @Column({ nullable: true })
    odemeTipi: string;
    @Column({ type: 'money', nullable: true })
    odenenTutar: number;
    @Column({ nullable: true })
    odemeSekli: string;
    @Column({ nullable: true })
    bankaKodu: string;
    @Column({ nullable: true })
    aciklama: string;
}