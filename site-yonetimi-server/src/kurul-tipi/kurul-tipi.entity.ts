import { BaseEntity } from "src/abstract/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'KurulTipi' })
export class KurulTipi extends BaseEntity {
    @Column({ length: 50 })
    ad: string;

    @Column()
    oncelik: number;
}