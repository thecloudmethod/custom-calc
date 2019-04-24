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
import { SafePipe } from './pipe/safe.pipe';

import { SvgService } from './services/svg.service'
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    CustomCalcSelectComponent,
    CustomCalcTotalComponent,
    CustomCalcSelectedOptionsListComponent,
    CustomCalcButtonComponent,
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
  providers: [SvgService],
  entryComponents: [CustomCalcSelectComponent, CustomCalcTotalComponent, CustomCalcButtonComponent]
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

    customElements.define('custom-calc-select', elCustomCalcSelectComponent);
    customElements.define('custom-calc-total', elCustomCalcTotalComponent);
    customElements.define('custom-calc-button', elCustomCalcButtonComponent);
  }
}