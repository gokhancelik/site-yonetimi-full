import { Injectable } from '@nestjs/common';
import { KisiService } from '../kisi/kisi.service';
import { JwtService } from '@nestjs/jwt';
import { NetgsmSmsGatewayService } from '../sms-gateway/netgsm-sms-gateway.service';
import { Mesken } from '../mesken/mesken.entity';
import { Kisi } from '../kisi/kisi.entity';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {

    constructor(
        private readonly kisiService: KisiService,
        private readonly smsService: NetgsmSmsGatewayService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.kisiService.findOneByUserName(username);
        if (user && user.sifre === pass) {
            const roles = await this.kisiService.getRoles(user.id);
            let result = {
                id: user.id,
                ad: user.ad,
                soyad: user.soyad,
                tamAd: user.tamAd,
                username,
                roles: roles.map(p => p.rol.kod)
            };
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id, ad: user.ad, soyad: user.soyad, tamAd: user.tamAd, roles: user.roles, };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async sendPassword(telno: string) {
        if (!telno) {
            return {
                success: false,
                message: 'Telefon numarası zorunludur.'
            };
        }
        let kisi = await Kisi.find({
            join: {
                alias: 'kisi',
                innerJoinAndSelect: {
                    meskenKisi: 'kisi.meskenKisis',
                    mesken: 'meskenKisi.mesken'
                }
            },
            where: {
                cepTelefon: telno
            }
        });
        if (!kisi.length) {
            return {
                success: false,
                message: 'Kullanıcı bulunamadı'
            };
        }
        let icerik = kisi.map(k => {
            let kullaniciAdi = k.meskenKisis.map(m => 'K. ADI: ' + m.mesken.kod + ' \nŞİFRE: ' + k.sifre);
            return kullaniciAdi.join(' \n ')

        });
        let mesaj = 'ÇİĞDEM ADASI KULLANICI ADI VE ŞİFRENİZ: ' + icerik.join(' \n ');
        mesaj += "\n https://cigdemadasi.turkuazvadisi.com/";
        mesaj.length;
        // return {
        //     success: true,
        //     message: icerik
        // }
        return this.smsService.send('90'+kisi[0].cepTelefon, mesaj).pipe(map(d => {
            return {
                success: d.data.split(' ') === '00',
                message: d.data
            }
        })).toPromise();
    }
}
