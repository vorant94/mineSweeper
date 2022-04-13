import {Component, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {GenerateInitialMinefield} from "./state/app.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private readonly store: Store
  ) {
  }

  ngOnInit() {
    this.store.dispatch(new GenerateInitialMinefield());
  }
}
