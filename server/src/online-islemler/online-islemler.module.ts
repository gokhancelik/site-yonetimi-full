import { Module } from '@nestjs/common';
import { OnlineIslemlerController } from './online-islemler.controller';
import { TahakkukModule } from '../tahakkuk/tahakkuk.module';
import { TahsilatModule } from '../tahsilat/tahsilat.module';

@Module({
  controllers: [OnlineIslemlerController],
  imports: [TahakkukModule, TahsilatModule]
})
export class OnlineIslemlerModule { }
