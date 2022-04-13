export type MinefieldStateModel = Readonly<{
  minefield: MinefieldModel;
}>

export type MinefieldModel = ReadonlyArray<ReadonlyArray<CellModel>>;

export type CellModel = Readonly<{
  id: number;
  minesAroundCount: number | null;
  isOpened: boolean;
  isMined: boolean;
}>
