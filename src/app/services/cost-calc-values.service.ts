import { Injectable } from '@angular/core';
import { Subject, of , BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap, share, tap } from 'rxjs/operators';

import { CustomWindow, Options, DynamicProperty, Rules } from '../interfaces';
import { SortOptions } from '../libs/sort-options.class';
import { RuleTools } from '../libs/rules-tools.class';
import * as _ from 'lodash';

@Injectable()
export class CostCaslValuesService {

    private _selected: DynamicProperty = {};
    private _totalsList: Array<any> = [];
    private _selectedChanged = new BehaviorSubject({});
    private _totalsListChanged = new BehaviorSubject([]);
    public _selectedChanged$ = this._selectedChanged.asObservable();
    public _totalsListChanged$ = this._totalsListChanged.asObservable();

    public setSelected(property: string, values:any) {
        if(!this._selected[property]) {
            this._selected[property] = {};
        }

        this._selected[property] = values;
        this.triggerChange();
    }

    public getSelected() {
        return this._selectedChanged$;
    }

    public removeSelected(property: string): void {
        delete(this._selected[property]);
        this.triggerChange();
    }

    public getTotalsList() {
        return this._totalsListChanged$;
    }

    public currentTotal(rules: Rules[]) {
        return combineLatest(this.getTotalsList(), this.getSelected())
        .pipe(
          switchMap(([list, selected]) => {
            let setRules: any = {};
  
            for(let rule of rules) {
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
          }),
          switchMap(list => {
            let total: number = 0;
            
            for(let option of list) {
                total = (total*1) + (option.value*1);
            }

            return of(total)
          })
        )
    }

    private triggerChange() {
        this._selectedChanged.next(this._selected);

        let unSortedSelectionsArr = SortOptions.buildArrayFromPricesObject(this._selected);
        let sortedSelectionsArr = SortOptions.sortBy(unSortedSelectionsArr, 'sort');

        this._totalsList = sortedSelectionsArr;

        this._totalsListChanged.next(this._totalsList);
    }

}