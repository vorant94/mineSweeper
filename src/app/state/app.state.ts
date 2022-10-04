import {Injectable} from '@angular/core';
import {Action, Actions, NgxsOnInit, ofActionSuccessful, State, StateContext} from '@ngxs/store';
import {EndGame, ResetGame, StartGame} from './app.actions';
import {AppStateModel, END_GAME_TYPE_TO_MINEFIELD_DISABLE_TYPE} from "./app.models";
import {DEFAULTS} from "./app.defaults";
import {SettingsState} from "../settings/state/settings.state";
import {MinefieldState} from "../minefield/state/minefield.state";
import {DigCell, DisableMinefield, GenerateMinefield, RevealMinefield} from "../minefield/state/minefield.actions";
import {SetSettings} from "../settings/state/settings.actions";
import {MinefieldService} from "../minefield/state/minefield.service";

@State<AppStateModel>({
  name: 'app',
  defaults: DEFAULTS,
  children: [SettingsState, MinefieldState]
})
@Injectable()
export class AppState implements NgxsOnInit {

  constructor(
    private readonly minefieldService: MinefieldService,
    private readonly actions$: Actions,
  ) {
  }


  ngxsOnInit(ctx?: StateContext<AppStateModel>): void {
    if (!ctx) {
      throw new Error(`Can't init state since ctx is not defined`);
    }

    const {settings} = ctx.getState();
    ctx.dispatch(new GenerateMinefield(settings));

    this.actions$.pipe(
      ofActionSuccessful(SetSettings)
    ).subscribe(() => ctx.dispatch(new ResetGame()));

    this.actions$.pipe(
      ofActionSuccessful(DigCell)
    ).subscribe(({id}: DigCell) => {
      const {minefield: {minefield}, settings: {minesCount}, gameState} = ctx.getState();
      const actions: any[] = [];

      if (gameState == 'init') {
        actions.push(new StartGame());
      }

      const cell = this.minefieldService.getCellById(id, minefield);
      if (cell.isMined) {
        actions.push(new EndGame('loss'));
      }

      let closedCellsCount: number = 0;
      for (const row of minefield) {
        for (const cell of row) {
          if (!cell.isOpened) {
            closedCellsCount++
          }
        }
      }
      if (closedCellsCount === minesCount) {
        actions.push(new EndGame('victory'));
      }

      ctx.dispatch(actions);
    });
  }

  @Action(StartGame)
  startGame(ctx: StateContext<AppStateModel>): void {
    ctx.patchState({
      gameStartedTime: new Date(),
      gameEndedTime: null,
      gameState: 'in-progress',
    });
  }

  @Action(EndGame)
  endGame(ctx: StateContext<AppStateModel>, {type}: EndGame): void {
    ctx.patchState({
      gameEndedTime: new Date(),
      gameState: 'game-over',
    });

    const disableType = END_GAME_TYPE_TO_MINEFIELD_DISABLE_TYPE[type];

    ctx.dispatch([
      new DisableMinefield(disableType),
      new RevealMinefield()
    ]);
  }

  @Action(ResetGame)
  resetGame(ctx: StateContext<AppStateModel>): void {
    const {settings} = ctx.getState();
    ctx.dispatch(new GenerateMinefield(settings));

    ctx.patchState({
      gameStartedTime: null,
      gameEndedTime: null,
      gameState: 'init'
    });
  }
}
