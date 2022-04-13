import {Injectable} from '@angular/core';
import {Action, State, StateContext} from '@ngxs/store';
import {GenerateInitialMinefield} from './app.actions';
import {MinefieldState} from "../minefield/state/minefield.state";
import {GenerateMinefieldWithSettings} from "../minefield/state/minefield.actions";
import {AppStateModel} from "./app.models";
import {DEFAULTS} from "./app.defaults";

@State<AppStateModel>({
  name: 'app',
  defaults: DEFAULTS,
  children: [MinefieldState]
})
@Injectable()
export class AppState {
  constructor() {
  }

  @Action(GenerateInitialMinefield)
  generateMinefield(ctx: StateContext<AppStateModel>): void {
    const state = ctx.getState();

    ctx.dispatch(new GenerateMinefieldWithSettings(state.settings))
  }
}
