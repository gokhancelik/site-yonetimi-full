import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SanalPos } from './sanal-pos.entity';
import { DatabaseModule } from '../database/database.module';
import { SanalPosController } from './sanal-pos.controller';
import { SanalPosService } from './sanal-pos.service';

@Module({
    imports: [TypeOrmModule.forFeature([SanalPos]), DatabaseModule],
    controllers: [SanalPosController],
    providers: [SanalPosService],
    exports: [SanalPosService]
})
export class SanalPosModule { }
