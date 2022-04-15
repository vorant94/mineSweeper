import {Injectable} from '@angular/core';
import {Action, State, StateContext} from '@ngxs/store';
import {DEFAULTS} from "./settings.defaults";
import {SettingsStateModel} from "./settings.models";
import {SetSettings} from "./settings.actions";


@State<SettingsStateModel>({
  name: 'settings',
  defaults: DEFAULTS
})
@Injectable()
export class SettingsState {

  @Action(SetSettings)
  setSettings(ctx: StateContext<SettingsStateModel>, {settings}: SetSettings): void {
    ctx.patchState({
      ...settings
    });
  }
}
