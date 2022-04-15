import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {DigCell, DisableMinefield, GenerateNewMinefield, RevealMinefield} from "./minefield.actions";
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
    private readonly minefieldService: MinefieldService
  ) {
  }

  @Action(GenerateNewMinefield)
  generateNewMinefield(ctx: StateContext<MinefieldStateModel>, {settings}: GenerateNewMinefield): void {
    const minefield: MinefieldModel = this.minefieldService.generateNewMinefield(settings);

    ctx.setState({
      minefield,
      disabled: false,
      disableReason: null
    });
  }

  @Action(DigCell)
  digCell(ctx: StateContext<MinefieldStateModel>, {id}: DigCell): void {
    const minefield = (() => {
      const {minefield} = ctx.getState();

      const cell = this.minefieldService.getCellById(id, minefield);

      return this.minefieldService.openCell(cell, minefield)
    })();

    ctx.patchState({
      minefield
    });
  }

  @Action(DisableMinefield)
  disableMinefield(ctx: StateContext<MinefieldStateModel>, {disableReason}: DisableMinefield): void {
    ctx.patchState({
      disabled: true,
      disableReason
    });
  }

  @Action(RevealMinefield)
  revealMinefield(ctx: StateContext<MinefieldStateModel>): void {
    const minefield = (() => {
      const {minefield} = ctx.getState();

      return this.minefieldService.updateCells(() => ({isOpened: true}), minefield);
    })();

    ctx.patchState({
      minefield
    });
  }
}
