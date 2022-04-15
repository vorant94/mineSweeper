import {DisableReason, MinefieldSettingsModel} from "../../shared/models";

export class GenerateNewMinefield {
  static readonly type = '[Minefield] Generate Minefield with Settings';

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

  constructor(public readonly disableReason: DisableReason) {
  }
}

export class RevealMinefield {
  static readonly type = '[Minefield] Reveal Minefield';
}
