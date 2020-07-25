import { Module } from '@nestjs/common';
import { KisiRolService } from './kisi-rol.service';
import { KisiRolController } from './kisi-rol.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KisiRol } from './kisi-rol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([KisiRol])],
  providers: [KisiRolService],
  controllers: [KisiRolController]
})
export class KisiRolModule { }
