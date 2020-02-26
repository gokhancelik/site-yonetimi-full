import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetayGorunumuComponent } from './detay-gorunumu.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { DxFormModule, DxSelectBoxModule, DxHtmlEditorModule, DxButtonModule } from 'devextreme-angular';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [DetayGorunumuComponent],
  imports: [
    CommonModule,
    NgbCollapseModule,
    DxFormModule,
    DxSelectBoxModule,
    DxHtmlEditorModule,
    DxButtonModule,
    PipesModule,
  ],
  exports: [DetayGorunumuComponent]
})
export class DetayGorunumuModule { }
