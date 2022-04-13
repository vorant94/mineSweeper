import {Component, HostBinding, HostListener, Input} from '@angular/core';
import {Store} from "@ngxs/store";
import {OpenCell} from "../state/minefield.actions";
import {CellModel} from "../state/minefield.models";

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent {
  @Input() cell!: CellModel;

  constructor(
    private readonly store: Store
  ) {
  }

  @HostBinding('class.mined')
  private get isMined(): boolean {
    return this.isOpened && this.cell.isMined;
  }

  @HostBinding('class.opened')
  get isOpened(): boolean {
    return this.cell.isOpened;
  }

  @HostListener('click')
  private onClick(): void {
    this.store.dispatch(new OpenCell(this.cell.id))
  }
}
