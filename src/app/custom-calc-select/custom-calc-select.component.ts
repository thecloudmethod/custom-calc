import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core'


import { CustomWindow, Options } from '../interfaces';
declare let window: CustomWindow;

window.CostCalcValue = [];

@Component({
  selector: 'app-custom-calc-select',
  templateUrl: './custom-calc-select.component.html',
  styleUrls: ['./custom-calc-select.component.css']
})
export class CustomCalcSelectComponent implements OnInit {
  @Input() placeholder: string;
  @Input() optionName: string;
  @Input() options: string;
  @Output() value: EventEmitter<number> = new EventEmitter<number>();

  selectedValue: number;
  parsedOptions: Options[];


  constructor() { }

  ngOnInit() {
    console.log(this.placeholder)
    this.parsedOptions = JSON.parse(this.options)
  }

  triggerChange() {
    console.log(window.CostCalcValue);
    if(window.CostCalcValue[this.placeholder]){
      window.CostCalcValue[this.placeholder].value = this.selectedValue;
      window.CostCalcValue[this.placeholder].name = this.placeholder;
    } else {
      window.CostCalcValue[this.placeholder] = {};
      window.CostCalcValue[this.placeholder].value = this.selectedValue;
      window.CostCalcValue[this.placeholder].name = this.placeholder;
    }

    this.value.emit(this.selectedValue);
  }

}
