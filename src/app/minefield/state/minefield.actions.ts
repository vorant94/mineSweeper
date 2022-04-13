import {SettingsModel} from "../../state/app.models";
import {CellModel} from "./minefield.models";

export class GenerateMinefieldWithSettings {
  static readonly type = '[Minefield] Generate Minefield with Settings';

  constructor(public settings: SettingsModel) {
  }
}

export class OpenCell {
  static readonly type = '[App] Open Cell';

  constructor(public readonly id: CellModel['id']) {
  }
}
