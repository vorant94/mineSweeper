import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Select, Store} from "@ngxs/store";
import {SettingsState} from "../state/settings.state";
import {SettingsStateModel} from "../state/settings.models";
import {Observable, Subscription} from "rxjs";
import {SetSettings} from "../state/settings.actions";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  readonly formGroup: FormGroup = this.fb.group({
    rows: [null, Validators.required],
    columns: [null, Validators.required],
    minesCount: [null, Validators.required]
  });

  @Select(SettingsState) private readonly settings$!: Observable<SettingsStateModel>;

  private readonly onDestroySub$: Subscription = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store
  ) {
  }

  ngOnInit(): void {
    this.initStateToFormGroupSync();
  }

  ngOnDestroy() {
    this.onDestroySub$.unsubscribe();
  }

  setSettings() {
    this.store.dispatch(new SetSettings(this.formGroup.value))
  }

  private initStateToFormGroupSync() {
    this.onDestroySub$.add(
      this.settings$.subscribe(settings => {
        this.formGroup.patchValue(settings, {emitEvent: false});
      })
    );
  }
}
