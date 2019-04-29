import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core'

import { SortOptions } from '../libs/sort-options.class';
import { CustomWindow, Options } from '../interfaces';
import { CostCaslValuesService } from '../services/cost-calc-values.service'


@Component({
  selector: 'app-custom-calc-select',
  templateUrl: './custom-calc-select.component.html',
  styleUrls: ['./custom-calc-select.component.css']
})
export class CustomCalcSelectComponent implements OnInit {
  @Input() placeholder: string;
  @Input() description: string;
  @Input() optionName: string;
  @Input() options: string;
  @Input() sort: number;
  @Output() value: EventEmitter<number> = new EventEmitter<number>();

  selectedValue: number;
  parsedOptions: Options[];


  constructor(public ccvs: CostCaslValuesService) { }

  ngOnInit() {
    this.parsedOptions = JSON.parse(this.options);

    if(!this.description) {
      this.description = this.placeholder;
    }
  }

  triggerChange($event) {
    
    if(this.ccvs._selected[this.placeholder]){
      this.ccvs._selected[this.placeholder].value = this.selectedValue;
      this.ccvs._selected[this.placeholder].name = this.placeholder;
      this.ccvs._selected[this.placeholder].description = $event.source.triggerValue;
      this.ccvs._selected[this.placeholder].sort = this.sort;
    } else {
      this.ccvs._selected[this.placeholder] = {};
      this.ccvs._selected[this.placeholder].value = this.selectedValue;
      this.ccvs._selected[this.placeholder].name = this.placeholder;
      this.ccvs._selected[this.placeholder].description = $event.source.triggerValue;
      this.ccvs._selected[this.placeholder].sort = this.sort;
    }

    let unSortedSelectionsArr = SortOptions.buildArrayFromPricesObject(this.ccvs._selected);
    let sortedSelectionsArr = SortOptions.sortBy(unSortedSelectionsArr, 'sort');

    this.ccvs._totalsList = sortedSelectionsArr;

    this.value.emit(this.selectedValue);
  }

}
