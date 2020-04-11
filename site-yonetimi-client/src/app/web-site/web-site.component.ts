import { Component, OnInit } from '@angular/core';
import { AuthService, Token } from '../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-web-site',
  templateUrl: './web-site.component.html',
  styleUrls: ['./web-site.component.scss']
})
export class WebSiteComponent implements OnInit {
  navbarOpen: boolean;
  get user(): Token {
    return this.authService.getUser();
  }
  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  logout(e) {
    e.preventDefault();
    this.authService.logout();
    this.router.navigate(['']);
  }
}
