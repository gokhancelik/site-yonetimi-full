import { BaseEntity } from "src/abstract/base.entity";
import { Column, Entity, OneToMany, ManyToOne } from "typeorm";
import { Mesken } from "src/mesken/mesken.entity";
import { Kisi } from "src/kisi/kisi.entity";
import { KurulTipi } from "src/kurul-tipi/kurul-tipi.entity";
import { KurulUyeTipi } from "src/kurul-uye-tipi/kurul-uye-tipi.entity";



@Entity({ name: 'KurulUye' })
export class KurulUye extends BaseEntity {
    @Column('datetime2')
    baslamaTarihi: Date;

    @Column('datetime2')
    bitisTarihi: Date;

    @Column({  default: false })
    aktifMi: boolean;

    @ManyToOne(type => KurulTipi, { nullable: false })
    kurulTipi!: KurulTipi;

    @Column({ type: 'uuid', nullable: false })
    kurulTipiId!: string;

    @ManyToOne(type => Mesken, { nullable: false })
    mesken!: Mesken;

    @Column({ type: 'uuid', nullable: false })
    meskenId!: string;

    @ManyToOne(type => Kisi, { nullable: false })
    kisi!: Kisi;

    @Column({ type: 'uuid', nullable: false })
    kisiId!: string; 

    @ManyToOne(type => KurulUyeTipi, { nullable: false })
    kurulUyeTipi!: KurulUyeTipi;

    @Column({ type: 'uuid', nullable: false })
    kurulUyeTipiId!: string; 
}