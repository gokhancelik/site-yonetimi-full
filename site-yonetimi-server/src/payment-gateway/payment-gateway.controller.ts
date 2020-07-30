import { Controller, Post, Body, ValidationPipe, Res, Param, HttpService, UseGuards, Get, Req } from '@nestjs/common';
import { TahsilatService } from '../tahsilat/tahsilat.service';
import { AuthGuard } from '@nestjs/passport';
import { Kisi } from '../kisi/kisi.entity';
import CryptoJS = require('crypto-js');
import { map } from 'rxjs/operators';
import { Response, Request } from 'express'
import { TahsilatDurumu } from '../tahsilat/tahsilat.entity';
import { OdemeIslemleriService } from '../odeme-islemleri/odeme-islemleri.service';
import { PaytrService } from './providers/paytr/paytr.service';
import { TransactionResultDTO } from './providers/abstract/transaction-result.dto';
import { TransactionDTO } from './providers/abstract/transaction.dto';
@Controller('payment-gateway')
export class PaymentGatewayController {
    constructor(private readonly httpService: HttpService,
        private tahsilatService: TahsilatService,
        private paytrService: PaytrService,
        private odemeIslemleriService: OdemeIslemleriService) {
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('config/:tahsilatId')
    async config(@Param('tahsilatId') tahsilatId: string, @Req() req): Promise<any> {
        return this.paytrService.provision(tahsilatId, req.ip);
    }
    @Post('callback/:kod')
    async callback(@Param('kod') kod: string, @Req() req: Request, @Res() res: Response): Promise<any> {
        let body: TransactionDTO = req.body;
        return this.paytrService.transaction(body, res);
    }
    @Post('transfer-result/:kod')
    async transferResult(@Param('kod') kod: string, @Req() req: Request, @Res() res: Response): Promise<any> {
        // let body: TransactionDTO = req.body;
        return this.paytrService.transferResult(req.body, res);
    }
    @Post('transfer/:kod')
    async transfer(@Param('kod') kod: string, @Req() req: Request, @Res() res: Response): Promise<any> {
        // let body: TransactionDTO = req.body;
        return this.paytrService.transfer();
    }
}
