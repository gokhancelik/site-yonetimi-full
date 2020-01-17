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

}
