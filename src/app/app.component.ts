import {Component} from '@angular/core';
import {distinctUntilChanged, map, Observable, switchMap, timer} from "rxjs";
import {Select} from "@ngxs/store";
import {AppState} from "./state/app.state";
import {AppStateModel} from "./state/app.models";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly gameDuration$: Observable<number> = timer(0, 1000).pipe(
    switchMap(() => this.state$),
    map((state) => this.calculateGameDuration(state)),
    distinctUntilChanged(),
  );

  @Select(AppState) private readonly state$!: Observable<AppStateModel>;

  private calculateGameDuration({gameStartedTime, gameEndedTime}: AppStateModel): number {
    if (!gameStartedTime && !gameEndedTime) {
      return 0;
    }

    if (gameStartedTime && !gameEndedTime) {
      const now = new Date();
      const durationInMilliSeconds = now.getTime() - gameStartedTime.getTime();
      return Math.round(durationInMilliSeconds / 1000);
    }

    if (gameStartedTime && gameEndedTime) {
      const durationInMilliSeconds = gameEndedTime.getTime() - gameStartedTime.getTime();
      return Math.round(durationInMilliSeconds / 1000);
    }

    throw new Error(`Can't calculate game duration`);
  }
}
