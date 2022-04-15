import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsComponent} from './settings/settings.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    SettingsComponent
  ],
  exports: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class SettingsModule {
}
