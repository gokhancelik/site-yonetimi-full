import { Component, OnInit, Injector } from '@angular/core';
import { FaizGrubu } from '../faiz-grubu.model';
import { FaizGrubuService } from '../faiz-grubu.service';
import { BaseListComponent } from 'src/app/admin/base-list.component';

@Component({
  selector: 'app-faiz-grubu-list',
  templateUrl: './faiz-grubu-list.component.html',
  styleUrls: ['./faiz-grubu-list.component.scss']
})
export class FaizGrubuListComponent extends BaseListComponent<FaizGrubu> implements OnInit {
  columns: any[];
  constructor(service: FaizGrubuService, injector: Injector) {
    super(service, injector, FaizGrubu);
  }
}
