import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  toppings = new FormControl();
  email = new FormControl('', [Validators.required, Validators.email]);
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  fontSize = 14;
  constructor() {
        this.toppings.setValue(['Onion', 'Pepperoni'])

   }

  ngOnInit() {
  }

  onFontChange(fontSize: number) {
    this.fontSize = fontSize;
    document.documentElement.style.setProperty('font-size', `${this.fontSize}px`);
  }
}
