import { Module, HttpModule } from '@nestjs/common';
import { PaymentGatewayController } from './payment-gateway.controller';
import { TahsilatModule } from '../tahsilat/tahsilat.module';
import { OdemeIslemleriModule } from '../odeme-islemleri/odeme-islemleri.module';
import { PaytrService } from './providers/paytr/paytr.service';

@Module({
  controllers: [PaymentGatewayController],
  imports: [HttpModule, TahsilatModule, OdemeIslemleriModule],
  providers: [PaytrService]
})
export class PaymentGatewayModule { }
