import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {DigCell, DisableMinefield, GenerateMinefield, RevealMinefield} from "./minefield.actions";
import {MinefieldService} from "./minefield.service";
import {CellModel, MinefieldModel, MinefieldStateModel} from "./minefield.models";
import {DEFAULTS} from "./minefield.defaults";
import {cloneDeep, random} from "lodash";

@State<MinefieldStateModel>({
  name: 'minefield',
  defaults: DEFAULTS
})
@Injectable()
export class MinefieldState {
  @Selector()
  static minefield(state: MinefieldStateModel) {
    return state.minefield;
  }

  constructor(
    private readonly minefieldService: MinefieldService
  ) {
  }

  @Action(GenerateMinefield)
  generateMinefield(ctx: StateContext<MinefieldStateModel>, {settings}: GenerateMinefield): void {
    const {rows, columns, minesCount} = settings;

    //
    // generate an empty minefield
    //
    const minefield: MinefieldModel = Array.from(new Array(rows))
      .map((_, rowIndex) => {
        const row: CellModel[] = Array
          .from(new Array(columns))
          .map((_, columnIndex) => ({
            id: ++columnIndex,
            minesAroundCount: 0,
            isOpened: false,
            isMined: false
          }));

        return row.map((minefieldCell) => ({
          ...minefieldCell,
          id: minefieldCell.id + columns * rowIndex
        }))
      });

    //
    // place mines
    //
    let minesPlaced = 0;
    while (minesPlaced < minesCount) {
      const id: number = random(1, rows * columns);

      const cell = this.minefieldService.getCellById(id, minefield);
      if (cell.isMined) {
        continue;
      }

      cell.isMined = true;
      minesPlaced++;
    }

    //
    // update mine counters
    //
    for (const row of minefield) {
      for (const cell of row) {
        if (cell.isMined) {
          cell.minesAroundCount = null;
          continue;
        }

        cell.minesAroundCount = this.minefieldService.getCellNeighbors(cell, minefield)
          .filter((c) => c.isMined)
          .length;
      }
    }

    ctx.setState({
      minefield,
      disabled: false,
      disableType: null
    });
  }

  @Action(DigCell)
  digCell(ctx: StateContext<MinefieldStateModel>, {id}: DigCell): void {
    const minefield = cloneDeep(ctx.getState().minefield);

    const cell = this.minefieldService.getCellById(id, minefield);

    this.minefieldService.openCellWithNeighbors(cell, minefield)

    ctx.patchState({
      minefield
    });
  }

  @Action(DisableMinefield)
  disableMinefield(ctx: StateContext<MinefieldStateModel>, {disableType}: DisableMinefield): void {
    ctx.patchState({
      disabled: true,
      disableType
    });
  }

  @Action(RevealMinefield)
  revealMinefield(ctx: StateContext<MinefieldStateModel>): void {
    const minefield = cloneDeep(ctx.getState().minefield);

    for (const row of minefield) {
      for (const cell of row) {
        cell.isOpened = true;
      }
    }

    ctx.patchState({
      minefield
    });
  }
}
