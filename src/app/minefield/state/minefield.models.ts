export interface MinefieldStateModel {
  minefield: MinefieldModel;
  disabled: boolean;
  disableType: DisableType | null;
}

export type MinefieldModel = CellModel[][];

export interface CellModel {
  id: number;
  minesAroundCount: number | null;
  isOpened: boolean;
  isMined: boolean;
}

export type DisableType = 'pink' | 'lightgreen';
