import {SettingsStateModel} from "./settings.models";

export class SetSettings {
  static readonly type = '[Settings] Set Settings';

  constructor(public settings: SettingsStateModel) {
  }
}
