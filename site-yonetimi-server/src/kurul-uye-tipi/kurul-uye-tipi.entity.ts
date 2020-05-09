import { BaseEntity } from "src/abstract/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'KurulUyeTipi' })
export class KurulUyeTipi extends BaseEntity {
    @Column({ length: 50 })
    ad: string;

    @Column({ length: 15 })
    kodu: string;
}