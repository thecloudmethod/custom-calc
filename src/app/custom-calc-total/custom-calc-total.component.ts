import { Component, OnInit, Input } from '@angular/core';
import { CostCaslValuesService } from '../services/cost-calc-values.service'

@Component({
  selector: 'app-custom-calc-total',
  templateUrl: './custom-calc-total.component.html',
  styleUrls: ['./custom-calc-total.component.css']
})
export class CustomCalcTotalComponent implements OnInit {
  total: number =  0;

  @Input() type: string;
  @Input() description: string;

  constructor(public ccvs: CostCaslValuesService) { }

  ngOnInit() {
  }

  currentValue() {
    let total: number = 0;

    for(let option of Object.keys(this.ccvs._selected)) {
      total = (total*1) + (this.ccvs._selected[option].value*1);
    }

    return total;
  }

}
