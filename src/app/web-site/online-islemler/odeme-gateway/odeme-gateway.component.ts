import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-odeme-gateway',
  templateUrl: './odeme-gateway.component.html',
  styleUrls: ['./odeme-gateway.component.scss']
})
export class OdemeGatewayComponent implements OnInit {
  @Input() data;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  paymentResult(e) {
    const body = e.contentWindow.document.body;
    if (body) {
      const pre = body.getElementsByTagName('pre');
      if (pre && pre.length) {
        console.log(pre)
        const result: { resultCode: string, resultDetail: string } = JSON.parse(pre[0].innerHTML);
        console.log(result)
      }
    }
  }
}
