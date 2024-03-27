import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrl: './insurance.component.scss'
})
export class InsuranceComponent {
  patients: any[] = [
    { 
      id: 1, 
      name: 'John Doe', 
      balance: 500,
      claimed: 200,
      prescriptions: [
        { id: 1, name: 'Prescription 1', state: 'Approved' },
        { id: 2, name: 'Prescription 2', state: 'Pending' },
        // Add more prescriptions as needed
      ]
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      balance: 700,
      claimed: 300,
      prescriptions: [
        { id: 1, name: 'Prescription 3', state: 'Approved' },
        { id: 2, name: 'Prescription 4', state: 'Pending' },
        // Add more prescriptions as needed
      ]
    }
  ];
  
  searchedPatient: any | null = null;

  searchPatient(patientIdString: string) {
    const patientId = parseInt(patientIdString, 10);
    console.log('input: ', patientId);
    if (isNaN(patientId)) {
      this.searchedPatient = null; // Clear searchedPatient if search term is not a valid number
      return;
    }
  
    // Loop through patients array to find the patient with matching ID
    this.searchedPatient = this.patients.find(patient => patient.id === patientId);
  }


  constructor(private router: Router) {}

  viewPrescriptions(patientId: number) {
    this.router.navigate(['/insurance-claims', patientId]);
  }
  
}