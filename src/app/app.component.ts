import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import config from 'devextreme/core/config';
import { loadMessages, locale } from 'devextreme/localization';
import { devextr } from '../assets/i18n/devex-tr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'site-yonetimi-full';
  /**
   *
   */
  constructor() {
    loadMessages(devextr);
    locale('tr-TR');
    config({ defaultCurrency: 'TRY', decimalSeparator: ',', thousandsSeparator: '.' });
  }

}
