import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SvgService } from '../services/svg.service'

import { CustomWindow, Options } from '../interfaces';
declare let window: CustomWindow;

window.CostCalcValue = [];

@Component({
  selector: 'app-custom-calc-button',
  templateUrl: './custom-calc-button.component.html',
  styleUrls: ['./custom-calc-button.component.css']
})
export class CustomCalcButtonComponent implements OnInit {
  @Input() placeholder: string;
  @Input() image: string;
  @Input() svg: string;
  @Input() height: string;
  @Input() width: string;
  @Input() primary: string = "#000000";
  @Input() secondary: string = "aqua";
  @Input() value: number;

  selected: boolean = false;
  hover: boolean = false;
  svgData: string;
  parsedOptions: Options[];


  constructor(
    private sanitizer: DomSanitizer,
    private svgService: SvgService
  ) { }

  ngOnInit() {

    console.log(this.svg)
    this.svgService.loadSvg(this.svg).subscribe(data => {
      this.svgData = data;
      console.log(this.svgData)
    })
  }

  toggleButton() {
    this.selected = !this.selected;

    if(this.selected) {
      this.triggerChange();
    } else {
      delete(window.CostCalcValue[this.placeholder]);
    }
  }

  svgURL() {
    return this.sanitizer.bypassSecurityTrustUrl(this.svg);
  }
  
  getSVG() {
    return this.svgService.loadSvg(this.svg);
  }

  triggerChange() {
    console.log(window.CostCalcValue);
    if(window.CostCalcValue[this.placeholder]){
      window.CostCalcValue[this.placeholder].value = this.value;
      window.CostCalcValue[this.placeholder].name = this.placeholder;
    } else {
      window.CostCalcValue[this.placeholder] = {};
      window.CostCalcValue[this.placeholder].value = this.value;
      window.CostCalcValue[this.placeholder].name = this.placeholder;
    }

  }
}
