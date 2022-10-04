import {MinefieldSettingsModel} from "../../shared/models";
import {DisableType} from "./minefield.models";

export class GenerateMinefield {
  static readonly type = '[Minefield] Generate Minefield';

  constructor(public readonly settings: MinefieldSettingsModel) {
  }
}

export class DigCell {
  static readonly type = '[Minefield] Open Cell';

  constructor(public readonly id: number) {
  }
}

export class DisableMinefield {
  static readonly type = '[Minefield] Disable Minefield';

  constructor(public readonly disableType: DisableType) {
  }
}

export class RevealMinefield {
  static readonly type = '[Minefield] Reveal Minefield';
}
