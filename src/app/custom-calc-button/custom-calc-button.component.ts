import { Component, OnInit, Input , HostBinding } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SvgService } from '../services/svg.service';
import { CostCaslValuesService } from '../services/cost-calc-values.service'

import { RuleTools } from '../libs/rules-tools.class';
import { Options, Rules } from '../interfaces';
import * as _ from 'lodash';

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
  @Input() rules: string;

  @HostBinding('style.display') public display: string = 'block';

  selected: boolean = false;
  hover: boolean = false;
  svgData: string;
  parsedOptions: Options[];
  parsedRules: Rules[];


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

    this.svgService.loadSvg(this.svg).subscribe(data => {
      this.svgData = data;
     })

     this.ccvs.getSelected().subscribe(selected => {
      this.testRules(selected);
    })
  }

  toggleButton() {
    this.selected = !this.selected;

    if(this.selected) {
      this.ccvs.setSelected(
        this.placeholder,
        {
          value: this.value,
          name: this.placeholder,
          description: this.description,
          sort: this.sort
        }
      )
    } else {
      this.ccvs.removeSelected(this.placeholder);
    }

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
