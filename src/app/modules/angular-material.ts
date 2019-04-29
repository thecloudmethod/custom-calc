import { NgModule } from '@angular/core';
import { MatSelectModule, MatIconModule, MatInputModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [ MatSelectModule, MatIconModule, MatInputModule, MatButtonModule ],
  exports: [ MatSelectModule, MatIconModule, MatInputModule, MatButtonModule ],
})
export class AngularMaterialModule { }