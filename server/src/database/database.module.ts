import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from '../site/site.entity';
import { Blok } from '../blok/blok.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mssql',
            host: '94.73.148.5',
            port: 1433,
            username: 'u8998566_uZSitY',
            password: '4g3QRqNxMAAgTp3',
            database: 'u8998566_zsity',
            entities: [
                Site,
                Blok
            ],
            synchronize: true,
        })
    ],
})
export class DatabaseModule { }
