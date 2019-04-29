import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SvgService } from '../services/svg.service';
import { CostCaslValuesService } from '../services/cost-calc-values.service'

import { SortOptions } from '../libs/sort-options.class';
import { CustomWindow, Options } from '../interfaces';

@Component({
  selector: 'app-custom-calc-counter-button',
  templateUrl: './custom-calc-counter-button.component.html',
  styleUrls: ['./custom-calc-counter-button.component.css'],
})
export class CustomCalcCounterButtonComponent implements OnInit {
  @Input() placeholder: string;
  @Input() counterPlaceholder: string;
  @Input() description: string;
  @Input() image: string;
  @Input() svg: string;
  @Input() height: string;
  @Input() width: string;
  @Input() primary: string = "#000000";
  @Input() secondary: string = "aqua";
  @Input() value: number;
  @Input() sort: number;


  selected: boolean = false;
  editing: boolean = false;
  hover: boolean = false;
  svgData: string;
  parsedOptions: Options[];
  multiplier: number = 0;
  calc_value: number = 0;
  click_bypass_count: number = 0;


  constructor(
    private sanitizer: DomSanitizer,
    private svgService: SvgService,
    public ccvs: CostCaslValuesService
  ) { }

  ngOnInit() {
    if(!this.description) {
      this.description = this.placeholder;
    }

    if(!this.counterPlaceholder) {
      this.counterPlaceholder = this.placeholder;
    }

    this.svgService.loadSvg(this.svg).subscribe(data => {
      this.svgData = data;
     })
  }

  toggleButton() {
    this.selected = true;
    this.editing = true;
  }

  unToggleButton($event) {
    if(this.click_bypass_count==1) {
      this.selected = false;
      this.editing = false;
      this.click_bypass_count = 0;
    } else {
      this.click_bypass_count = 1
    }
  }

  increase() {
    this.multiplier = this.multiplier + 1;

    this.calc_value = this.value * this.multiplier;

    this.triggerChange();
    this.calculate();
  }

  decrease() {
    if(this.multiplier > 0) {
      this.multiplier = this.multiplier - 1;  
    }

    this.calc_value = this.value * this.multiplier;

    

    if(this.multiplier == 0) {
      this.selected = false;
      delete(this.ccvs._selected[this.placeholder]);
      this.calculate();
    } else {
      this.triggerChange();
      this.calculate();
    }
  }

  leave() {
    this.hover = false;
    this.editing = false;
  }

  calculate() {
    let unSortedSelectionsArr = SortOptions.buildArrayFromPricesObject(this.ccvs._selected);
    let sortedSelectionsArr = SortOptions.sortBy(unSortedSelectionsArr, 'sort');

    this.ccvs._totalsList = sortedSelectionsArr;
  }

  svgURL() {
    return this.sanitizer.bypassSecurityTrustUrl(this.svg);
  }
  
  getSVG() {
    return this.svgService.loadSvg(this.svg);
  }

  triggerChange() {
    if(this.ccvs._selected[this.placeholder]){
      this.ccvs._selected[this.placeholder].value = this.calc_value;
      this.ccvs._selected[this.placeholder].name = this.placeholder;
      this.ccvs._selected[this.placeholder].description = this.description+' ('+this.multiplier+')';
      this.ccvs._selected[this.placeholder].sort = this.sort;
    } else {
      this.ccvs._selected[this.placeholder] = {};
      this.ccvs._selected[this.placeholder].value = this.calc_value;
      this.ccvs._selected[this.placeholder].name = this.placeholder;
      this.ccvs._selected[this.placeholder].description = this.description+' ('+this.multiplier+')';
      this.ccvs._selected[this.placeholder].sort = this.sort;
    }
  }
}
