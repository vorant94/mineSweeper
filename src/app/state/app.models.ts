import {SettingsStateModel} from "../settings/state/settings.models";
import {MinefieldStateModel} from "../minefield/state/minefield.models";
import {DisableReason} from "../shared/models";

export type AppStateModel = Readonly<{
  settings: SettingsStateModel;
  minefield: MinefieldStateModel;
  gameState: GameState;
  gameStartedTime: Date | null;
  gameEndedTime: Date | null;
}>

export type GameState = 'init' | 'in-progress' | DisableReason;
