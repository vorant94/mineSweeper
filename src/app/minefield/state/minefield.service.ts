import {Injectable} from '@angular/core';
import {CellModel, MinefieldModel} from './minefield.models';

@Injectable({
  providedIn: 'root'
})
export class MinefieldService {
  getCellById(id: number, minefield: MinefieldModel): CellModel {
    const {row, column} = this.getCellCoordinatesById(id, minefield);

    return minefield[row][column];
  }

  openCellWithNeighbors(cell: CellModel, minefield: MinefieldModel): void {
    if (cell.isOpened) {
      return;
    }

    cell.isOpened = true;
    if (cell.isMined || cell.minesAroundCount !== 0) {
      return;
    }

    const neighbors = this.getCellNeighbors(cell, minefield)
    for (const neighbor of neighbors) {
      this.openCellWithNeighbors(neighbor, minefield)
    }
  }

  getCellNeighbors(cell: CellModel, minefield: MinefieldModel): CellModel[] {
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

  private getCellCoordinatesById(id: number, minefield: MinefieldModel): { row: number, column: number } {
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
}
