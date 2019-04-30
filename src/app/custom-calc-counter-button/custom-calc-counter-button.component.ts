import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SvgService } from '../services/svg.service';
import { CostCaslValuesService } from '../services/cost-calc-values.service'

import { RuleTools } from '../libs/rules-tools.class';
import { Options, Rules } from '../interfaces';
import * as _ from 'lodash';

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
  @Input() rules: string;
  


  selected: boolean = false;
  editing: boolean = false;
  hover: boolean = false;
  svgData: string;
  parsedOptions: Options[];
  multiplier: number = 0;
  calc_value: number = 0;
  click_bypass_count: number = 0;
  parsedRules: Rules[];
  @HostBinding('style.display') public display: string = 'block';
  


  constructor(
    private sanitizer: DomSanitizer,
    private svgService: SvgService,
    public ccvs: CostCaslValuesService
  ) { }

  ngOnInit() {
    if(this.rules) {
      this.parsedRules = JSON.parse(this.rules);
    }

    if(!this.description) {
      this.description = this.placeholder;
    }

    if(!this.counterPlaceholder) {
      this.counterPlaceholder = this.placeholder;
    }

    this.svgService.loadSvg(this.svg).subscribe(data => {
      this.svgData = data;
     })

     this.ccvs.getSelected().subscribe(selected => {
      this.testRules(selected);
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

    this.ccvs.setSelected(
      this.placeholder,
      {
        value: this.calc_value,
        name: this.placeholder,
        description: this.description+' ('+this.multiplier+')',
        sort: this.sort
      }
    )
  }

  decrease() {
    if(this.multiplier > 0) {
      this.multiplier = this.multiplier - 1;  
    }

    this.calc_value = this.value * this.multiplier;

    

    if(this.multiplier == 0) {
      this.selected = false;
      this.ccvs.removeSelected(this.placeholder);
    } else {
      this.ccvs.setSelected(
        this.placeholder,
        {
          value: this.calc_value,
          name: this.placeholder,
          description: this.description+' ('+this.multiplier+')',
          sort: this.sort
        }
      )    
    }
  }

  leave() {
    this.hover = false;
    this.editing = false;
  }

  svgURL() {
    return this.sanitizer.bypassSecurityTrustUrl(this.svg);
  }
  
  getSVG() {
    return this.svgService.loadSvg(this.svg);
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
