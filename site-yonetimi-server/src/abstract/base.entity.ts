import {
    PrimaryGeneratedColumn, Column,
    CreateDateColumn, UpdateDateColumn,
    BaseEntity as TypeOrmBaseEntity
} from "typeorm";

export abstract class BaseEntity extends TypeOrmBaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @CreateDateColumn({ type: 'datetime' })
    olusturmaTarihi?: Date;
    @Column({ length: 100 })
    olusturan: string = 'anonymous';
    @UpdateDateColumn({ type: 'datetime' })
    guncellemeTarihi: Date;
    @Column({ length: 100 })
    guncelleyen: string = 'anonymous';
    @Column({ length: 100, nullable: true })
    aktarimId: string;
    // @Column({ type: 'boolean', default: false })
    // silindiMi: boolean;
    // @Column({ type: 'datetime', nullable: true })
    // silinmeTarihi?: Date;
    // @Column({ length: 100, nullable: true })
    // silen: string;
    // @BeforeRemove()
    // private beforeRemove() {
    //     this.silinmeTarihi = new Date();
    // }
}