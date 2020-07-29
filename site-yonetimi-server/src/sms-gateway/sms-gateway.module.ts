import { Module, HttpModule } from '@nestjs/common';
import { NetgsmSmsGatewayService } from './netgsm-sms-gateway.service';
import { SmsGatewayController } from './sms-gateway.controller';

@Module({
    providers: [NetgsmSmsGatewayService],
    controllers: [SmsGatewayController],
    imports: [HttpModule],
    exports: [NetgsmSmsGatewayService]
})
export class SmsGatewayModule { }
