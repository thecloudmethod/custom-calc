import { Component, OnInit, Input } from '@angular/core';
import { CostCaslValuesService } from '../services/cost-calc-values.service'
import { Rules } from '../interfaces';

@Component({
  selector: 'app-custom-calc-total',
  templateUrl: './custom-calc-total.component.html',
  styleUrls: ['./custom-calc-total.component.css']
})
export class CustomCalcTotalComponent implements OnInit {
  total: number =  0;

  @Input() type: string;
  @Input() description: string;
  @Input() rules: string;
  parsedRules: Rules[] = [];

  constructor(public ccvs: CostCaslValuesService) { }

  ngOnInit() {
    if(this.rules) {
      this.parsedRules = JSON.parse(this.rules);
    }

    this.ccvs.currentTotal(this.parsedRules).subscribe(total =>  this.total = total);
  }

}
