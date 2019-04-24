import { Component, OnInit } from '@angular/core';

export interface CustomWindow extends Window {
  CostCalcValue: any;
}

declare let window: CustomWindow;

@Component({
  selector: 'app-custom-calc-total',
  templateUrl: './custom-calc-total.component.html',
  styleUrls: ['./custom-calc-total.component.css']
})
export class CustomCalcTotalComponent implements OnInit {
  total: number =  window.CostCalcValue;

  constructor() { }

  ngOnInit() {
  }

  currentValue() {
    let total: number = 0;

    for(let option of Object.keys(window.CostCalcValue)) {
      total = (total*1) + (window.CostCalcValue[option].value*1);
    }

    return total;
  }

}
