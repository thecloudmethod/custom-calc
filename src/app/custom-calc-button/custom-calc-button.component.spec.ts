import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCalcButtonComponent } from './custom-calc-button.component';

describe('CustomCalcButtonComponent', () => {
  let component: CustomCalcButtonComponent;
  let fixture: ComponentFixture<CustomCalcButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomCalcButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCalcButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
