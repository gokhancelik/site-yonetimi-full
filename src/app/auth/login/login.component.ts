import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthResult } from '../models/auth-result';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  // socialLinks: NbAuthSocialLink[] = [];
  rememberMe = false;

  constructor(protected service: AuthService,
    protected cd: ChangeDetectorRef,
    protected router: Router) {

    // this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    // this.showMessages = this.getConfigValue('forms.login.showMessages');
    // this.strategy = this.getConfigValue('forms.login.strategy');
    // this.socialLinks = this.getConfigValue('forms.login.socialLinks');
    // this.rememberMe = this.getConfigValue('forms.login.rememberMe');
  }
  ngOnInit(): void {
  }
  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.service.authenticate(this.strategy, this.user).subscribe((result: AuthResult) => {
      this.submitted = false;

      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
      this.cd.detectChanges();
    });
  }
}
