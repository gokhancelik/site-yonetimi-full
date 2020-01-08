import { Injectable } from '@nestjs/common';
import { KisiService } from '../kisi/kisi.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly kisiService: KisiService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.kisiService.findOneByUserName(username);
        if (user && user.sifre === pass) {
            const { sifre, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}