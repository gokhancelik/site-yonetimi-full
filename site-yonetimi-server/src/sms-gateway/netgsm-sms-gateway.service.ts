import { Injectable, HttpService } from '@nestjs/common';
import { SmsGatewayService } from './sms-gateway.abstract.service';
import { Observable } from 'rxjs';

@Injectable()
export class NetgsmSmsGatewayService implements SmsGatewayService {
    url: string = 'https://api.netgsm.com.tr/sms/send/xml';
    company: string = 'Netgsm';
    usercode: string = '8503073618';
    password: string = '84MVPJMQ';
    type: string = '1:n';
    msgheader: string = 'TURKUAZVDYK';
    startdate?: Date;
    stopdate?: Date;
    filtre: string;
    /**
     *
     */
    constructor(private http: HttpService) {
        this.company = 'Netgsm';
    }
    send(no: string, msg: string): Observable<any> {

        let ss: string = `<?xml version='1.0' encoding='UTF-8'?>
                            <mainbody>
                                <header>
                                    <company dil='TR'>${this.company}</company>
                                    <usercode>${this.usercode}</usercode>
                                    <password>${this.password}</password>
                                    <type>${this.type}</type>
                                    <msgheader>${this.msgheader}</msgheader>
                                </header>
                                <body>
                                    <msg>
                                        <![CDATA[${msg}]]>
                                    </msg>
                                    <no>${no}</no>  
                                </body>
                            </mainbody>
                                    `;
        return this.http.post(this.url, ss, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }

}
