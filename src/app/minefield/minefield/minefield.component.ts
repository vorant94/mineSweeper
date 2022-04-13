import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {Observable, Subscription} from "rxjs";
import {OpenCell} from "../state/minefield.actions";
import {MinefieldState} from "../state/minefield.state";
import {CellModel, MinefieldModel} from "../state/minefield.models";

@Component({
  selector: 'app-minefield',
  templateUrl: './minefield.component.html',
  styleUrls: ['./minefield.component.scss']
})
export class MinefieldComponent implements OnInit, OnDestroy {
  @Select(MinefieldState.minefield) readonly minefield$!: Observable<MinefieldModel>;

  private rows?: number;
  private columns?: number;

  private readonly onDestroy$: Subscription = new Subscription();

  constructor(
    private readonly store: Store
  ) {
  }

  ngOnInit() {
    this.minefield$.subscribe((minefield) => {
      this.rows = minefield.length;
      this.columns = minefield[0]?.length;
    });
  }

  ngOnDestroy() {
    this.onDestroy$.unsubscribe();
  }

  @HostBinding('style.grid-template-rows')
  private get gridTemplateRows(): string {
    return `repeat(${this.rows}, 1fr)`
  };

  @HostBinding('style.grid-template-columns')
  private get gridTemplateColumns(): string {
    return `repeat(${this.columns}, 1fr)`
  }

  openCell(id: CellModel['id']) {
    this.store.dispatch(new OpenCell(id));
  }
}
