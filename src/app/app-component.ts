import { Component } from "@angular/core";

/** @title Select with custom trigger text */
@Component({
  selector: "app-component",
  templateUrl: "app-component.html",
  styleUrls: ["app-component.css"]
})
export class AppComponent {
  tab = 0;
  constructor() {
    this.tab = parseInt(window.localStorage.getItem("tab") || "0");
  }

  selectTab(tab: number) {
    this.tab = tab;
    window.localStorage.setItem("tab", tab.toString());
  }
}

/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
