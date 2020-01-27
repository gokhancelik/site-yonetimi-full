import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bagimsiz-bolum-detay',
  templateUrl: './bagimsiz-bolum-detay.component.html',
  styleUrls: ['./bagimsiz-bolum-detay.component.scss']
})
export class BagimsizBolumDetayComponent implements OnInit {
  bagimsizBolumId: string;

  constructor(
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.bagimsizBolumId = this.route.snapshot.params.id;
  }

}
