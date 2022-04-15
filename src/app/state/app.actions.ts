import {DisableReason} from "../shared/models";

export class InitMinefield {
  static readonly type = '[App] Generate initial Minefield';
}

export class StartTheGame {
  static readonly type = '[App] Start the Game';
}

export class EndTheGame {
  static readonly type = '[App] End the Game';

  constructor(
    public readonly gameState: DisableReason
  ) {
  }
}

export class DigCell {
  static readonly type = '[App] Dig cell';

  constructor(public readonly id: number) {
  }
}
