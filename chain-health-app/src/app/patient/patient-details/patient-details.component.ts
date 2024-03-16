import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.scss'
})
export class PatientDetailsComponent {
  @Input() balance: number = 0; // input decorator allows flow from parent component
  @Input() prescriptions: any[] = []; // Assuming prescriptions is an array of objects

}
