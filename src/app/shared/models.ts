export type MinefieldSettingsModel = Readonly<{
  rows: number;
  columns: number;
  minesCount: number;
}>

export type DisableReason = 'game-over' | 'victory';
