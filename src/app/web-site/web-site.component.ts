import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-web-site',
  templateUrl: './web-site.component.html',
  styleUrls: ['./web-site.component.scss']
})
export class WebSiteComponent implements OnInit {
  navbarOpen: boolean;

  constructor() { }

  ngOnInit() {
  }
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
