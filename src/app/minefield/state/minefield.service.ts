import {Injectable} from '@angular/core';
import * as _ from "lodash";
import { SettingsModel } from '../../state/app.models';
import {CellModel, MinefieldModel} from './minefield.models';

@Injectable({
  providedIn: 'root'
})
export class MinefieldService {
  generateEmptyMinefield({rows, columns}: SettingsModel): MinefieldModel {
    //
    // generate first dimension with ids based on indexes
    //
    const row: ReadonlyArray<CellModel> = _.times(
      columns,
      (index) => _.cloneDeep({
        id: ++index,
        minesAroundCount: 0,
        isOpened: false,
        isMined: false
      })
    );

    //
    // generate the second dimension with ids based on indexes multiplied by first dimension size
    //
    const minefield = _.times(
      rows,
      (index) => _.cloneDeep(row)
        .map((minefieldCell) => ({
          ...minefieldCell,
          id: minefieldCell.id + columns * index
        }))
    );

    return minefield;
  }

  fillMinefield(minefield: MinefieldModel, settings: SettingsModel): MinefieldModel {
    //
    // place mines
    //
    let minesCount = 0;
    while (minesCount < settings.minesCount) {
      const id: CellModel['id'] = _.random(1, settings.rows * settings.columns);

      const cell = this.getCellById(id, minefield);
      if (cell.isMined) {
        continue;
      }

      minefield = this.updateCellById(id, {isMined: true}, minefield);

      minesCount++;
    }

    //
    // update counters
    //
    minefield = this.updateCells(
      (cell) => ({
        minesAroundCount: cell.isMined
          ? null
          : this.getCellNeighbors(cell, minefield).filter(({isMined}) => isMined).length
      }),
      minefield
    );

    return minefield;
  }

  getCellById(id: CellModel['id'], minefield: MinefieldModel): CellModel {
    const {row, column} = this.getCellCoordinatesById(id, minefield);

    return minefield[row][column];
  }

  openCell(cell: CellModel, minefield: MinefieldModel): MinefieldModel {
    if (cell.isOpened) {
      return minefield;
    }

    minefield = this.updateCellById(cell.id, {isOpened: true}, minefield);

    if (cell.isMined || cell.minesAroundCount !== 0) {
      return minefield;
    }

    const neighbors = this.getCellNeighbors(cell, minefield)
    for (const neighbor of neighbors) {
      minefield = this.openCell(neighbor, minefield)
    }

    return minefield;
  }

  private getCellNeighbors(cell: CellModel, minefield: MinefieldModel): ReadonlyArray<CellModel> {
    const res: CellModel[] = [];

    const {row, column} = this.getCellCoordinatesById(cell.id, minefield);

    const rowLimit = minefield.length - 1;
    const columnLimit = minefield[0].length - 1;
    for (let i = Math.max(0, row - 1); i <= Math.min(row + 1, rowLimit); i++) {
      for (let j = Math.max(0, column - 1); j <= Math.min(column + 1, columnLimit); j++) {
        if (i !== row || j !== column) {
          res.push(minefield[i][j]);
        }
      }
    }

    return res;
  }

  private getCellCoordinatesById(id: CellModel['id'], minefield: MinefieldModel): { row: number, column: number } {
    for (let i = 0; i < minefield.length; i++) {
      const row = minefield[i];

      const j = row.findIndex((cell) => cell.id == id);
      if (j !== -1) {
        return {
          row: i,
          column: j
        };
      }
    }

    throw new Error(`Can't find cell with id [${id}]`);
  }

  private updateCellById(id: CellModel['id'], cellToReplace: Partial<CellModel>, minefield: MinefieldModel): MinefieldModel {
    return minefield.map(row => row.map((cell) => cell.id == id ? {...cell, ...cellToReplace} : cell));
  }

  private updateCells(callback: (cell: CellModel) => Partial<CellModel>, minefield: MinefieldModel): MinefieldModel {
    return minefield.map((row) => row.map((cell) => ({...cell, ...callback(cell)})));
  }
}
