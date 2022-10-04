import {EndGameType} from "./app.models";

export class StartGame {
  static readonly type = '[App] Start Game';
}

export class EndGame {
  static readonly type = '[App] End Game';

  constructor(
    public readonly type: EndGameType,
  ) {
  }
}

export class ResetGame {
  static readonly type = '[App] Reset Game';
}
