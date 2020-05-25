import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { GelirGiderTanimi } from "../gelir-gider-tanimi/gelir-gider-tanimi.entity";
import { BaseEntity } from "../abstract/base.entity";
import { Mesken } from "../mesken/mesken.entity";
import { Firma } from "src/firma/firma.entity";

export enum BorcDurumu {
    Odenmedi,
    Odendi,
    Icrada
}

@Entity({ name: 'Borc' })
export class Borc extends BaseEntity {
    @Column({ type: 'uuid' })
    meskenId: string;

    @ManyToOne(type => Mesken, m => m.borclar)
    mesken: Mesken;

    @Column('datetime2')
    vadeTarihi: Date;

    @Column({ type: 'nvarchar', nullable: true, length: 'MAX' })
    aciklama: string;

    @Column({ type: 'money' })
    tutar: number;

    @Column({ type: 'money', nullable: true })
    odenenTutar?: number;

    @Column({ type: 'int' })
    durumu: BorcDurumu = BorcDurumu.Odenmedi;

    @Column({ type: 'uuid' })
    islemTipiId!: string;

    @ManyToOne(type => GelirGiderTanimi)
    islemTipi!: GelirGiderTanimi;
    
    @Column({  default: false })
    tahakkukOlusturulduMu: boolean;

    @Column({ type: 'uuid', nullable: true })
    firmaId?: string;

    @ManyToOne(type => Firma)
    firma?: Firma;
}