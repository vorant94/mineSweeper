import {DisableReason} from "../../shared/models";

export type MinefieldStateModel = Readonly<{
  minefield: MinefieldModel;
  disabled: boolean;
  disableReason: DisableReason | null;
}>

export type MinefieldModel = ReadonlyArray<ReadonlyArray<CellModel>>;

export type CellModel = Readonly<{
  id: number;
  minesAroundCount: number | null;
  isOpened: boolean;
  isMined: boolean;
}>
