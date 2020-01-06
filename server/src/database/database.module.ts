import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from '../site/site.entity';
import { Blok } from '../blok/blok.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mssql',
            host: 'localhost',
            port: 7010,
            username: 'sa',
            password: 'qwe123**',
            database: 'zsity',
            entities: [
                Site,
                Blok
            ],
            synchronize: true,
        })
    ],
})
export class DatabaseModule { }
