import { Controller } from '@nestjs/common';
import { BaseController } from '../abstract/base.controller';
import { BankaTanim } from './banka-tanim.entity';
import { BankaTanimService } from './banka-tanim.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Banka Tanım')
@Controller('banka-tanim')
export class BankaTanimController extends BaseController<BankaTanim, BankaTanimService> {
    constructor(service: BankaTanimService) {
        super(service);
    }
}