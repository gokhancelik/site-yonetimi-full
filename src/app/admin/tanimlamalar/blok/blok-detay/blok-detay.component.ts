import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blok-detay',
  templateUrl: './blok-detay.component.html',
  styleUrls: ['./blok-detay.component.scss']
})
export class BlokDetayComponent implements OnInit {

  blokId: string;
  constructor(private route : ActivatedRoute) { }

  ngOnInit() {
    this.blokId = this.route.snapshot.params.id;
  }

}
