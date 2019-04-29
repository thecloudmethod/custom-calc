import { Component, OnInit } from '@angular/core';

import { CustomWindow, Options } from '../interfaces';
import { CostCaslValuesService } from '../services/cost-calc-values.service'

@Component({
  selector: 'app-custom-calc-selected-options-list',
  templateUrl: './custom-calc-selected-options-list.component.html',
  styleUrls: ['./custom-calc-selected-options-list.component.css']
})
export class CustomCalcSelectedOptionsListComponent implements OnInit {

  selectedOptions: Array<any> = [];

  constructor(public ccvs: CostCaslValuesService) { 
  
  }

  ngOnInit() {

  }

}
