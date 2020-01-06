import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  menu: NbMenuItem[] = [
    {
      title: 'Tanımlamalar',
      icon: 'home-outline',
      children: [
        {
          title: 'Site',
          link: '/admin/tanimlamalar/site/list',
        },
        {
          title: 'Blok',
          link: '/admin/tanimlamalar/blok/list',
        },
      ]
    },
    {
      title: 'FEATURES',
      group: true,
    },
    {
      title: 'Auth',
      icon: 'lock-outline',
      children: [
        {
          title: 'Login',
          link: '/auth/login',
        },
        {
          title: 'Register',
          link: '/auth/register',
        },
        {
          title: 'Request Password',
          link: '/auth/request-password',
        },
        {
          title: 'Reset Password',
          link: '/auth/reset-password',
        },
      ],
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
