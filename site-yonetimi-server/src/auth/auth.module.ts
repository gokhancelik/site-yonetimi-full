import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategyService } from './jwt-strategy/jwt-strategy.service';
import { AuthController } from './auth.controller';
import { KisiModule } from '../kisi/kisi.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt-strategy/jwt-contants';
import { LocalStrategy } from './local-strategy/local-strategy.service';
import { SmsGatewayModule } from '../sms-gateway/sms-gateway.module';

@Module({
  imports: [
    KisiModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '180m' },
    }),
    SmsGatewayModule
  ],
  providers: [AuthService, JwtStrategyService, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
