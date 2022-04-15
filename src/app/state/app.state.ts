import {Injectable} from '@angular/core';
import {Action, Actions, NgxsOnInit, ofActionSuccessful, State, StateContext} from '@ngxs/store';
import {EndTheGame, InitMinefield, StartTheGame} from './app.actions';
import {AppStateModel} from "./app.models";
import {DEFAULTS} from "./app.defaults";
import {SettingsState} from "../settings/state/settings.state";
import {MinefieldState} from "../minefield/state/minefield.state";
import {DigCell, DisableMinefield, GenerateNewMinefield, RevealMinefield} from "../minefield/state/minefield.actions";
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
    ctx.dispatch(new GenerateNewMinefield(settings));

    this.actions$.pipe(
      ofActionSuccessful(SetSettings)
    ).subscribe(({settings}: SetSettings) => {
      ctx.dispatch(new GenerateNewMinefield(settings))
    });

    this.actions$.pipe(
      ofActionSuccessful(DigCell)
    ).subscribe(({id}: DigCell) => {
      const {minefield: {minefield}, settings: {minesCount}, gameState} = ctx.getState();
      let actions: any[] = [];

      if (gameState == 'init') {
        actions = [...actions, new StartTheGame()];
      }

      const cell = this.minefieldService.getCellById(id, minefield);
      if (cell.isMined) {
        actions = [...actions, new EndTheGame('game-over')];
      }

      const closedCellsCount = this.minefieldService.countCellsBy(
        ({isOpened}) => !isOpened,
        minefield
      );
      if (closedCellsCount === minesCount) {
        actions = [...actions, new EndTheGame('victory')];
      }

      ctx.dispatch(actions);
    });
  }

  @Action(InitMinefield)
  initMinefield(ctx: StateContext<AppStateModel>): void {
    const state = ctx.getState();

    ctx.dispatch(new GenerateNewMinefield(state.settings));
  }

  @Action(StartTheGame)
  startTheGame(ctx: StateContext<AppStateModel>): void {
    ctx.patchState({
      gameStartedTime: new Date(),
      gameEndedTime: null,
      gameState: 'in-progress',
    });
  }

  @Action(EndTheGame)
  endTheGame(ctx: StateContext<AppStateModel>, {gameState}: EndTheGame): void {
    ctx.patchState({
      gameEndedTime: new Date(),
      gameState,
    });

    ctx.dispatch([
      new DisableMinefield(gameState),
      new RevealMinefield()
    ]);
  }
}
