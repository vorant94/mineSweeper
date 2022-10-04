import {SettingsStateModel} from "../settings/state/settings.models";
import {DisableType, MinefieldStateModel} from "../minefield/state/minefield.models";

export interface AppStateModel {
  settings: SettingsStateModel;
  minefield: MinefieldStateModel;
  gameState: GameState;
  gameStartedTime: Date | null;
  gameEndedTime: Date | null;
}

export type GameState = 'init' | 'in-progress' | 'game-over';

export type EndGameType = 'loss' | 'victory';

export const END_GAME_TYPE_TO_MINEFIELD_DISABLE_TYPE: Record<EndGameType, DisableType> = {
  loss: 'pink',
  victory: 'lightgreen'
}
