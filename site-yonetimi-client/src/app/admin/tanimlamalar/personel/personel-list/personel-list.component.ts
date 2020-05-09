import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/admin/base-list.component';
import { PersonelService } from '../personel.service';
import { Personel } from '../personel.model';
import { Injector } from '@angular/core';

@Component({
  selector: 'app-personel-list',
  templateUrl: './personel-list.component.html',
  styleUrls: ['./personel-list.component.scss']
})
export class PersonelListComponent extends BaseListComponent<Personel> implements OnInit {
  columns: any[];
  constructor(service: PersonelService, injector: Injector) {
    super(service, injector, Personel);
  }
}
