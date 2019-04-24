import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCalcTotalComponent } from './custom-calc-total.component';

describe('CustomCalcTotalComponent', () => {
  let component: CustomCalcTotalComponent;
  let fixture: ComponentFixture<CustomCalcTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomCalcTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCalcTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
