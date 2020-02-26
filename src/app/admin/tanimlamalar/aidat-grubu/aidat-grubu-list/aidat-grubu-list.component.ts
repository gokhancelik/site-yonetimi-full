import { Component, OnInit, Injector } from '@angular/core';
import { BaseListComponent } from '../../../base-list.component';
import { AidatGrubu } from '../aidat-grubu.model';
import { AidatGrubuService } from '../aidat-grubu.service';

@Component({
  selector: 'app-aidat-grubu-list',
  templateUrl: './aidat-grubu-list.component.html',
  styleUrls: ['./aidat-grubu-list.component.scss']
})
export class AidatGrubuListComponent extends BaseListComponent<AidatGrubu> implements OnInit {
  columns: any[];
  constructor(service: AidatGrubuService, injector: Injector) {
    super(service, injector, AidatGrubu);
  }
}
