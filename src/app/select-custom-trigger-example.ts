import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";

/** @title Select with custom trigger text */
@Component({
  selector: "select-custom-trigger-example",
  templateUrl: "select-custom-trigger-example.html",
  styleUrls: ["select-custom-trigger-example.css"]
})
export class SelectCustomTriggerExample {
  tab = 0;
  toppings = new FormControl();

  toppingList: string[] = [
    "Extra cheese",
    "Mushroom",
    "Onion",
    "Pepperoni",
    "Sausage",
    "Tomato"
  ];

  constructor() {
    this.toppings.setValue(["Onion", "Pepperoni"]);
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
