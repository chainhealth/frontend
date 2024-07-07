import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientInsuranceDetailsComponent } from './patient-insurance-details.component';

describe('PatientInsuranceDetailsComponent', () => {
  let component: PatientInsuranceDetailsComponent;
  let fixture: ComponentFixture<PatientInsuranceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientInsuranceDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientInsuranceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
