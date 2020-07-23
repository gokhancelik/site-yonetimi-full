import { Controller, Post, Body, ValidationPipe, Res, Param } from '@nestjs/common';

@Controller('payment-gateway')
export class PaymentGatewayController {
    @Post('callback/:paymentProvider/:param')
    async callback(@Param('paymentProvider') paymentProvider: string, @Param('param') param: string, @Body() model: any, @Res() res): Promise<any> {
        // let provisionResult = await this.kuveytTurkSanalPosService.provision(model);
        res.redirect('http://localhost:4200/online-islemler/odeme-sonucu?sonucId=' + paymentProvider);
    }
}
