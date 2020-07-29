import { Controller, UseGuards, Post, UseInterceptors, ClassSerializerInterceptor, ValidationPipe, Body } from '@nestjs/common';
import { RoleGuard } from '../auth/guards/role.guard';
import { NetgsmSmsGatewayService } from './netgsm-sms-gateway.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('sms gateway')
@Controller('sms-gateway')
@UseGuards(RoleGuard)
export class SmsGatewayController {
    /**
     *
     */
    constructor(private smsGateway: NetgsmSmsGatewayService) {
    }
    @Post('send')
    @UseInterceptors(ClassSerializerInterceptor)
    async send(@Body(new ValidationPipe({ transform: true })) sms: { no: string, mesaj: string }): Promise<any> {
        let result = await this.smsGateway.send('905058090200', 'Deneme mesaji. ÇĞÜŞİı DENEME MESAJI').toPromise();
        return result.data;
    }
}
