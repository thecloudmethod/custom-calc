import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { CustomCalcSelectComponent } from './custom-calc-select/custom-calc-select.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/angular-material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomCalcTotalComponent } from './custom-calc-total/custom-calc-total.component';
import { CustomCalcSelectedOptionsListComponent } from './custom-calc-selected-options-list/custom-calc-selected-options-list.component';
import { CustomCalcButtonComponent } from './custom-calc-button/custom-calc-button.component';
import { CustomCalcCounterButtonComponent } from './custom-calc-counter-button/custom-calc-counter-button.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { SafePipe } from './pipe/safe.pipe';

import { SvgService } from './services/svg.service'
import { CostCaslValuesService } from './services/cost-calc-values.service'
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    CustomCalcSelectComponent,
    CustomCalcTotalComponent,
    CustomCalcSelectedOptionsListComponent,
    CustomCalcButtonComponent,
    CustomCalcCounterButtonComponent,
    ClickOutsideDirective,
    SafePipe
  ],
  imports: [
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SvgService, CostCaslValuesService],
  entryComponents: [CustomCalcSelectComponent, CustomCalcTotalComponent, CustomCalcButtonComponent, CustomCalcCounterButtonComponent, CustomCalcSelectedOptionsListComponent]
})
export class AppModule { 
  constructor(
    private injector: Injector
  ){

  }

  //In case of angular elements, we need to bootstrap manually
  ngDoBootstrap(){
    var elCustomCalcSelectComponent = createCustomElement(CustomCalcSelectComponent,{injector:this.injector});
    var elCustomCalcTotalComponent = createCustomElement(CustomCalcTotalComponent,{injector:this.injector});
    var elCustomCalcButtonComponent = createCustomElement(CustomCalcButtonComponent,{injector:this.injector});
    var elCustomCalcCounterButtonComponent = createCustomElement(CustomCalcCounterButtonComponent,{injector:this.injector});
    var elCustomCalcSelectedOptionsListComponent = createCustomElement(CustomCalcSelectedOptionsListComponent,{injector:this.injector});

    customElements.define('custom-calc-select', elCustomCalcSelectComponent);
    customElements.define('custom-calc-total', elCustomCalcTotalComponent);
    customElements.define('custom-calc-button', elCustomCalcButtonComponent);
    customElements.define('custom-calc-counter-button', elCustomCalcCounterButtonComponent);
    customElements.define('custom-calc-selected-options', elCustomCalcSelectedOptionsListComponent);
  }
}