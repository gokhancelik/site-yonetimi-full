import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SumPipe } from './sum.pipe';
import { GroupByPipe } from './group-by.pipe';
import { SafePipe } from './safe.pipe';



@NgModule({
  declarations: [SumPipe, GroupByPipe, SafePipe],
  imports: [
    CommonModule
  ],
  exports: [SumPipe, GroupByPipe, SafePipe]
})
export class PipesModule { }
