import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() request) {
        return this.authService.login(request.user);
    }
    @Post('send-password')
    async sendPassword(@Body() data: { telno: string }) {
        return this.authService.sendPassword(data.telno);
    }
}
