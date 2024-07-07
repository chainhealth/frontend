import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-patient-insurance-details',
  templateUrl: './patient-insurance-details.component.html',
  styleUrls: ['./patient-insurance-details.component.scss']
})
export class PatientInsuranceDetailsComponent {
  @Input() patient: any;
}
