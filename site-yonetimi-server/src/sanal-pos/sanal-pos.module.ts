import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SanalPos } from './sanal-pos.entity';
import { DatabaseModule } from '../database/database.module';
import { SanalPosController } from './sanal-pos.controller';
import { SanalPosService } from './sanal-pos.service';
import { OdemeIslemleriModule } from '../odeme-islemleri/odeme-islemleri.module';

@Module({
    imports: [TypeOrmModule.forFeature([SanalPos]), DatabaseModule, OdemeIslemleriModule],
    controllers: [SanalPosController],
    providers: [SanalPosService],
    exports: [SanalPosService]
})
export class SanalPosModule { }
