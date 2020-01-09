import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebSiteComponent } from './web-site.component';
import { WebSiteRoutingModule } from './web-site-routing.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [WebSiteComponent],
  imports: [
    CommonModule,
    WebSiteRoutingModule,
    NgbDropdownModule
  ]
})
export class WebSiteModule { }
