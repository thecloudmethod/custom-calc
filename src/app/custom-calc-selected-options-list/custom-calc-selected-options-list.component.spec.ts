import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCalcSelectedOptionsListComponent } from './custom-calc-selected-options-list.component';

describe('CustomCalcSelectedOptionsListComponent', () => {
  let component: CustomCalcSelectedOptionsListComponent;
  let fixture: ComponentFixture<CustomCalcSelectedOptionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomCalcSelectedOptionsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCalcSelectedOptionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
