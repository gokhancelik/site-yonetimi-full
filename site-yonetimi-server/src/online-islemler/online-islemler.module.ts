import { Module, HttpModule } from '@nestjs/common';
import { OnlineIslemlerController } from './online-islemler.controller';
import { TahakkukModule } from '../tahakkuk/tahakkuk.module';
import { TahsilatModule } from '../tahsilat/tahsilat.module';
import { OnlineIslemlerService } from './online-islemler.service';
import { KuveytTurkSanalPosService } from './kuveyt-turk-sanal-pos.service';

@Module({
  controllers: [OnlineIslemlerController],
  providers: [OnlineIslemlerService, KuveytTurkSanalPosService],
  imports: [TahakkukModule, TahsilatModule, HttpModule]
})
export class OnlineIslemlerModule { }
