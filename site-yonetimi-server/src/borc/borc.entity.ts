import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Blok } from "../blok/blok.entity";
import { GelirGiderTanimi } from "../gelir-gider-tanimi/gelir-gider-tanimi.entity";
import { BaseEntity } from "../abstract/base.entity";

export enum BorcDurumu {
    Odenmedi,
    Odendi,
    Icrada
}

@Entity({ name: 'Borc' })
export class Borc extends BaseEntity {
    @Column({ type: 'uuid' })
    blokId: string;

    @ManyToOne(type => Blok, blok => blok.borclar)
    blok: Blok;

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
}