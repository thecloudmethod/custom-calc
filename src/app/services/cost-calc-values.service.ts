import { Injectable } from '@angular/core';

import { CustomWindow, Options, DynamicProperty } from '../interfaces';

@Injectable()
export class CostCaslValuesService {

    public _selected: DynamicProperty = {};
    public _totalsList: Array<any> = [];

}