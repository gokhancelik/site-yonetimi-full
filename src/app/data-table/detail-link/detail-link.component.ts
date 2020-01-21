import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'detail-link',
  templateUrl: './detail-link.component.html',
  styleUrls: ['./detail-link.component.scss']
})
export class DetailLinkComponent implements OnInit {
  @Input() detailKey: any;
  @Input() data: any;
  @Input() value: any;
  @Input() routerLink: string[];
  constructor() { }

  ngOnInit() {
    this.routerLink = this.routerLink.map(m => m === `:${this.detailKey}` ? this.data.data[this.detailKey] : m);
  }
}
