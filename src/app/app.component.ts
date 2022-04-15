import {Component, OnDestroy, OnInit} from '@angular/core';
import {filter, Observable, Subscription, switchMap, timer} from "rxjs";
import {Actions, ofActionSuccessful, Select} from "@ngxs/store";
import {AppState} from "./state/app.state";
import {AppStateModel} from "./state/app.models";
import {EndTheGame, StartTheGame} from "./state/app.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  gameDurationInSeconds = 0;

  @Select(AppState) private readonly state$!: Observable<AppStateModel>;

  private readonly gameDurationSub$: Subscription = new Subscription();
  private readonly onDestroySub$: Subscription = new Subscription();

  constructor(private readonly actions$: Actions) {
  }

  ngOnInit() {
    this.initGameDurationOnGameStart();
    this.cleanupGameDurationOnGameEnd();
  }

  ngOnDestroy() {
    this.onDestroySub$.unsubscribe();
    this.gameDurationSub$.unsubscribe();
  }

  private initGameDurationOnGameStart() {
    this.onDestroySub$.add(
      this.actions$.pipe(
        ofActionSuccessful(StartTheGame),
      ).subscribe(() => this.initGameDurationCalculation())
    );
  }

  private cleanupGameDurationOnGameEnd() {
    this.onDestroySub$.add(
      this.actions$.pipe(
        ofActionSuccessful(EndTheGame)
      ).subscribe(() => this.gameDurationSub$.unsubscribe())
    );
  }

  private initGameDurationCalculation() {
    this.gameDurationSub$.add(
      timer(0, 1000).pipe(
        switchMap(() => this.state$),
        filter(({gameStartedTime}) => !!gameStartedTime)
      ).subscribe(({gameStartedTime}) => {
        const now = new Date();
        const durationInMilliSeconds = now.getTime() - gameStartedTime!.getTime();
        this.gameDurationInSeconds = Math.round(durationInMilliSeconds / 1000);
      })
    )
  }
}
