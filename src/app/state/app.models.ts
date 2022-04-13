export type AppStateModel = Readonly<{
  settings: SettingsModel
}>

export type SettingsModel = Readonly<{
  rows: number;
  columns: number;
  minesCount: number;
}>
