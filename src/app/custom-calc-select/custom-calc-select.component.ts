import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, HostBinding } from '@angular/core'

import { RuleTools } from '../libs/rules-tools.class';
import { Options, Rules } from '../interfaces';
import { CostCaslValuesService } from '../services/cost-calc-values.service'
import * as _ from 'lodash';


@Component({
  selector: 'app-custom-calc-select',
  templateUrl: './custom-calc-select.component.html',
  styleUrls: ['./custom-calc-select.component.css']
})
export class CustomCalcSelectComponent implements OnInit, AfterViewInit {
  @Input() placeholder: string;
  @Input() description: string;
  @Input() optionName: string;
  @Input() options: string;
  @Input() sort: number;
  @Input() rules: string;
  @Output() value: EventEmitter<number> = new EventEmitter<number>();
  @HostBinding('style.display') public display: string = 'block';

  selectedValue: number;
  parsedOptions: Options[];
  parsedRules: Rules[];


  constructor(public ccvs: CostCaslValuesService) { }

  ngOnInit() {
    this.parsedOptions = JSON.parse(this.options);

    if(this.rules) {
      this.parsedRules = JSON.parse(this.rules);
    }

    if(!this.description) {
      this.description = this.placeholder;
    }

    this.ccvs.getSelected().subscribe(selected => {
      this.testRules(selected);
    })
  }

  ngAfterViewInit() {
    this.selectedValue =  this.parsedOptions[0].value;
    let event = { source: { triggerValue: this.parsedOptions[0].option }};
    this.triggerChange(event);   
  }

  triggerChange($event) {
    
    this.ccvs.setSelected(
      this.placeholder,
      {
        value: this.selectedValue,
        name: this.placeholder,
        description: $event.source.triggerValue,
        sort: this.sort
      }
    )

    this.value.emit(this.selectedValue);
  }

  testRules(selected) {
    if(this.rules) {
      let failedRuleCount: number = 0;

      for(let rule of this.parsedRules) {
        if(selected && rule.path) {
          const res = _.get(selected, rule.path, null)

          if(!RuleTools.testByCondition(res, rule.value, rule.operator)) {
            failedRuleCount = failedRuleCount + 1
          }
        }
        
      }

      if(failedRuleCount > 0 ) {
        this.display = 'none';
      } else {
        this.display = 'block';
      }
    } 
  }

}
