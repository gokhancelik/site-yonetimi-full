import { BaseEntity } from "../abstract/base.entity";
import { Column, PrimaryColumn, Entity } from "typeorm";
import { Expose } from "class-transformer";
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
    @Column({ nullable: true })
    makbuzNo: string;
    @Column({ type: 'money', nullable: false, default: 0 })
    islenenTutar: number;
    @Expose()
    get kalanTutar(): number {
        return Number(this.odenenTutar.toFixed(3)) - Number(this.islenenTutar.toFixed(3));
    }
    @Expose()
    get islendiMi(): boolean {
        return this.kalanTutar <= 0;
    }
}