import { Controller, Post, UseGuards, Body, Get, Param, HttpService, Req, Res, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TahsilatService } from '../../tahsilat/tahsilat.service';
import { Kisi } from '../../kisi/kisi.entity';
import { HmacSHA256 } from 'crypto-js';
import CryptoJS = require('crypto-js');
import { catchError, map } from 'rxjs/operators';
import { Response, Request } from 'express';
@Controller('payment-gateway')
export class PaymentGatewayController {
    constructor(private readonly httpService: HttpService,
        private tahsilatService: TahsilatService) {
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('config/:tahsilatId')
    async config(@Param('tahsilatId') tahsilatId: string, @Req() req): Promise<any> {
        let tahsilat = await this.tahsilatService.findById(tahsilatId);
        let kisi = await Kisi.findOne(tahsilat.meskenKisi.kisiId);
        let buff = new Buffer(JSON.stringify(tahsilat.tahsilatKalems.map(s => { return { ProductName: s.odemeTipi.aciklama, Price: s.tutar, quantity: 1 } })));
        let base64data = buff.toString('base64');
        let body = {
            merchant_id: tahsilat.sanalPos.ayarlarParsed.merchant_id,
            user_ip: req.ip,
            merchant_oid: tahsilat.id.replace(/-/g, ''),
            email: kisi.eposta,
            payment_amount: (tahsilat.tutar * 100).toString().split('.')[0],
            user_basket: base64data,
            paytr_token: '',
            no_installment: '0',
            max_installment: '0',
            currency: 'TL',
            debug_on: tahsilat.sanalPos.ayarlarParsed.debug_on || '1',
            test_mode: tahsilat.sanalPos.ayarlarParsed.test_mode || '1',
            user_name: kisi.tamAd,
            user_address: kisi.adres,
            user_phone: kisi.cepTelefon,
            merchant_ok_url: 'https://localhost:4200/online-islemler/odeme-basarili',
            merchant_fail_url: 'https://localhost:4200/online-islemler/odeme-hatali',
            lang: '',
            timeout_limit: '30'
        }
        let concatStr: string = `${body.merchant_id}${body.user_ip}${body.merchant_oid}${body.email}${body.payment_amount}${base64data}${body.no_installment}${body.max_installment}${body.currency}${body.test_mode}${tahsilat.sanalPos.ayarlarParsed.merchant_salt}`;
        let tokenBuf = new Buffer(concatStr);
        let sha = CryptoJS.HmacSHA256(concatStr, tahsilat.sanalPos.ayarlarParsed.merchant_key);
        body.paytr_token = sha.toString(CryptoJS.enc.Base64);
        const data = Object.entries(body)
            .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
            .join('&');
        return this.httpService.post('https://www.paytr.com/odeme/api/get-token', data,
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).pipe(map(d => {
                return d.data;
            })).toPromise();
    }
    @Post('callback/:kod')
    async callback(@Param('kod') kod: string, @Req() req: Request, @Res() res: Response): Promise<any> {
        console.log(req);
        res.status(HttpStatus.OK).json();
        return req;
    }
}
