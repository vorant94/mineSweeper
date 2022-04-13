import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MinefieldComponent} from './minefield/minefield.component';
import {CellComponent} from './cell/cell.component';
import {NgxsModule} from "@ngxs/store";
import {MinefieldState} from "./state/minefield.state";

@NgModule({
  declarations: [
    MinefieldComponent,
    CellComponent
  ],
  exports: [
    MinefieldComponent
  ],
  imports: [
    CommonModule,
    NgxsModule.forFeature([MinefieldState])
  ]
})
export class MinefieldModule {
}
