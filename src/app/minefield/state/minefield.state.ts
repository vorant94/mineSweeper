import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {GenerateMinefieldWithSettings, OpenCell} from "./minefield.actions";
import {MinefieldService} from "./minefield.service";
import {MinefieldModel, MinefieldStateModel} from "./minefield.models";
import {DEFAULTS} from "./minefield.defaults";

@State<MinefieldStateModel>({
  name: 'minefield',
  defaults: DEFAULTS
})
@Injectable()
export class MinefieldState {
  @Selector()
  static minefield(state: MinefieldStateModel) {
    return state.minefield;
  }

  constructor(
    private readonly service: MinefieldService
  ) {
  }

  @Action(GenerateMinefieldWithSettings)
  generateMinefieldWithSettings(ctx: StateContext<MinefieldStateModel>, {settings}: GenerateMinefieldWithSettings): void {

    const minefield: MinefieldModel = (() => {
      const res: MinefieldModel = this.service.generateEmptyMinefield(settings);

      return this.service.fillMinefield(res, settings)
    })();

    ctx.patchState({
      minefield
    });
  }

  @Action(OpenCell)
  openCell(ctx: StateContext<MinefieldStateModel>, {id}: OpenCell): void {
    const state = ctx.getState();

    const minefield: MinefieldModel = (() => {
      const cell = this.service.getCellById(id, state.minefield);

      return this.service.openCell(cell, state.minefield)
    })();

    ctx.patchState({
      minefield
    });
  }
}
