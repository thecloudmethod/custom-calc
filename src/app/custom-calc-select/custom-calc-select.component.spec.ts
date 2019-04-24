import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCalcSelectComponent } from './custom-calc-select.component';

describe('CustomCalcSelectComponent', () => {
  let component: CustomCalcSelectComponent;
  let fixture: ComponentFixture<CustomCalcSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomCalcSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCalcSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
