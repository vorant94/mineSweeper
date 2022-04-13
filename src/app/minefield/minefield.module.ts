import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinefieldComponent } from './minefield/minefield.component';
import { CellComponent } from './cell/cell.component';



@NgModule({
  declarations: [
    MinefieldComponent,
    CellComponent
  ],
  exports: [
    MinefieldComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MinefieldModule { }
