import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SumPipe } from './sum.pipe';
import { GroupByPipe } from './group-by.pipe';



@NgModule({
  declarations: [SumPipe, GroupByPipe],
  imports: [
    CommonModule
  ],
  exports: [SumPipe, GroupByPipe]
})
export class PipesModule { }
