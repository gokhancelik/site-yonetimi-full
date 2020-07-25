import { Entity, Column } from "typeorm";
import { BaseEntity } from "src/abstract/base.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'Rol' })
export class Rol extends BaseEntity {
    @Column({ length: 50 })
    @ApiProperty({ name: 'ad' })
    ad: string;

    @Column({ length: 50 })
    @ApiProperty({ name: 'ad' })
    kod: string;
}