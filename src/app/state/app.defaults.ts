import {AppStateModel} from "./app.models";

//
// TODO how to avoid error here that is caused by sub-state stuff ??
//
export const DEFAULTS: AppStateModel = {
  gameState: 'init',
  gameStartedTime: null,
  gameEndedTime: null,
} as AppStateModel;
