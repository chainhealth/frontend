import { Component } from '@angular/core';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss'
})
export class PatientComponent {
  patientBalance: number = 500; 
  patientPrescriptions: any[] = [
    { name: 'Prescription 1', state: 'Pending' },
    { name: 'Prescription 2', state: 'Rejected' },
    { name: 'Prescription 3', state: 'Purchased' }
  ]; // Example prescriptions

}
