import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {Observable, Subscription} from "rxjs";
import {DigCell} from "../state/minefield.actions";
import {MinefieldState} from "../state/minefield.state";
import {MinefieldModel, MinefieldStateModel} from "../state/minefield.models";

@Component({
  selector: 'app-minefield',
  templateUrl: './minefield.component.html',
  styleUrls: ['./minefield.component.scss']
})
export class MinefieldComponent implements OnInit, OnDestroy {
  @Select(MinefieldState) readonly state$!: Observable<MinefieldStateModel>;

  @Select(MinefieldState.minefield) private readonly minefield$!: Observable<MinefieldModel>;

  private rows?: number;
  private columns?: number;

  private readonly onDestroySub$: Subscription = new Subscription();

  constructor(
    private readonly store: Store
  ) {
  }

  ngOnInit() {
    this.initMinefieldSizeAssignment();
  }

  ngOnDestroy() {
    this.onDestroySub$.unsubscribe();
  }

  digCell(id: number) {
    this.store.dispatch(new DigCell(id));
  }

  @HostBinding('style.grid-template-rows')
  private get gridTemplateRows(): string {
    return `repeat(${this.rows}, 1fr)`
  };

  @HostBinding('style.grid-template-columns')
  private get gridTemplateColumns(): string {
    return `repeat(${this.columns}, 1fr)`
  }

  private initMinefieldSizeAssignment() {
    this.onDestroySub$.add(
      this.minefield$.subscribe((minefield) => {
        this.rows = minefield.length;
        this.columns = minefield[0]?.length;
      })
    );
  }
}
