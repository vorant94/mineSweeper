import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgxsModule} from "@ngxs/store";
import {AppState} from "./state/app.state";
import {MinefieldModule} from "./minefield/minefield.module";
import {SettingsModule} from "./settings/settings.module";
import {SettingsState} from "./settings/state/settings.state";
import {MinefieldState} from "./minefield/state/minefield.state";
import {environment} from "../environments/environment";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot(
      [AppState, SettingsState, MinefieldState],
      {developmentMode: !environment.production}
    ),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    MinefieldModule,
    SettingsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
