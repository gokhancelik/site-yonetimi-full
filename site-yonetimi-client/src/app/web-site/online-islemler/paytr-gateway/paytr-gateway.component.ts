import { Component, OnInit, Input, Pipe, PipeTransform } from '@angular/core';
import { Tahsilat } from '../models/tahsilat.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-paytr-gateway',
  templateUrl: './paytr-gateway.component.html',
  styleUrls: ['./paytr-gateway.component.scss']
})
export class PaytrGatewayComponent implements OnInit {
  @Input() tahsilat: Tahsilat;
  result: { status: string, token: string };
  url: string;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<{ status: string, token: string }>(environment.apiUrl + 'payment-gateway/config/' + this.tahsilat.id).subscribe(res => {
      this.result = res;
      this.url = 'https://www.paytr.com/odeme/guvenli/' + res.token;
    })
  }
  paymentResult(e) {
    // const body = e.contentWindow.document.body;
    // if (body) {
    //   const pre = body.getElementsByTagName('pre');
    //   if (pre && pre.length) {
    //     console.log(pre)
    //     const result: { resultCode: string, resultDetail: string } = JSON.parse(pre[0].innerHTML);
    //     console.log(result)
    //   }
    // }
  }
}
