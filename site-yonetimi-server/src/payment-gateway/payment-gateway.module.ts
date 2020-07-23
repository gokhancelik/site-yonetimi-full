import { Module } from '@nestjs/common';
import { PaymentGatewayController } from './payment-gateway.controller';

@Module({
  controllers: [PaymentGatewayController]
})
export class PaymentGatewayModule {}
