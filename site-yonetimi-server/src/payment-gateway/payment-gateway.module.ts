import { Module, HttpModule } from '@nestjs/common';
import { PaymentGatewayController } from './payment-gateway.controller';
import { TahsilatModule } from '../tahsilat/tahsilat.module';
import { OdemeIslemleriModule } from '../odeme-islemleri/odeme-islemleri.module';

@Module({
  controllers: [PaymentGatewayController],
  imports:[HttpModule, TahsilatModule, OdemeIslemleriModule]
})
export class PaymentGatewayModule {}
