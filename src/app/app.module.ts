import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgxsModule} from "@ngxs/store";
import {AppState} from "./state/app.state";
import {MinefieldModule} from "./minefield/minefield.module";
import {MinefieldState} from "./minefield/state/minefield.state";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([AppState, MinefieldState]),
    MinefieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
