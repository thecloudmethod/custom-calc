import { Component, OnInit, Input } from '@angular/core';

import { Rules } from '../interfaces';
import { CostCaslValuesService } from '../services/cost-calc-values.service'
import { switchMap } from 'rxjs/operators';
import { of, combineLatest } from 'rxjs';
import { RuleTools } from '../libs/rules-tools.class';
import * as _ from 'lodash';

@Component({
  selector: 'app-custom-calc-selected-options-list',
  templateUrl: './custom-calc-selected-options-list.component.html',
  styleUrls: ['./custom-calc-selected-options-list.component.css']
})
export class CustomCalcSelectedOptionsListComponent implements OnInit {
  @Input() rules: string;

  selectedOptions: Array<any> = [];
  parsedRules: Rules[];

  constructor(public ccvs: CostCaslValuesService) { 
  
  }

  ngOnInit() {
    if(this.rules) {
      this.parsedRules = JSON.parse(this.rules);
    }
  }

  listItems() {
    return combineLatest(this.ccvs.getTotalsList(), this.ccvs.getSelected())
      .pipe(
        switchMap(([list, selected]) => {
          let setRules: any = {};

          for(let rule of this.parsedRules) {
            const res = _.get(selected, rule.path, null)

            if(Array.isArray(rule.value)) {
              for(let value of rule.value) {
                if(RuleTools.testByCondition(res, value, rule.operator)) {
                  if(Array.isArray(rule.placeholder)) {
                    for(let placeholder of rule.placeholder) {
                      setRules[placeholder] = rule.display;  
                    }
                  } else {
                    setRules[rule.placeholder] = rule.display;
                  }
                }
              }
            
            } else {
              if(RuleTools.testByCondition(res, rule.value, rule.operator)) {
                if(Array.isArray(rule.placeholder)) {
                  for(let placeholder of rule.placeholder) {
                    setRules[placeholder] = rule.display;  
                  }
                } else {
                  setRules[rule.placeholder] = rule.display;
                }
              }  
            }
          }

          const res = list.filter(item => {
            if(setRules.hasOwnProperty(item.name)) {
              return setRules[item.name];
            } else {
              return true;
            } 
          })

          return of(res)
        })
      )
  }

}

