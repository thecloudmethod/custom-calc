import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SvgService } from '../services/svg.service';
import { CostCaslValuesService } from '../services/cost-calc-values.service'

import { SortOptions } from '../libs/sort-options.class';
import { CustomWindow, Options } from '../interfaces';

@Component({
  selector: 'app-custom-calc-button',
  templateUrl: './custom-calc-button.component.html',
  styleUrls: ['./custom-calc-button.component.css']
})
export class CustomCalcButtonComponent implements OnInit {
  @Input() placeholder: string;
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
  hover: boolean = false;
  svgData: string;
  parsedOptions: Options[];


  constructor(
    private sanitizer: DomSanitizer,
    private svgService: SvgService,
    public ccvs: CostCaslValuesService
  ) { }

  ngOnInit() {
    if(!this.description) {
      this.description = this.placeholder;
    }

    this.svgService.loadSvg(this.svg).subscribe(data => {
      this.svgData = data;
     })
  }

  toggleButton() {
    this.selected = !this.selected;

    if(this.selected) {
      this.triggerChange();
    } else {
      delete(this.ccvs._selected[this.placeholder]);
    }

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
      this.ccvs._selected[this.placeholder].value = this.value;
      this.ccvs._selected[this.placeholder].name = this.placeholder;
      this.ccvs._selected[this.placeholder].description = this.description;
      this.ccvs._selected[this.placeholder].sort = this.sort;
    } else {
      this.ccvs._selected[this.placeholder] = {};
      this.ccvs._selected[this.placeholder].value = this.value;
      this.ccvs._selected[this.placeholder].name = this.placeholder;
      this.ccvs._selected[this.placeholder].description = this.description;
      this.ccvs._selected[this.placeholder].sort = this.sort;
    }
  }
}
