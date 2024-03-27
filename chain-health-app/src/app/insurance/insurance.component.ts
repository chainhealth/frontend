import { Component } from '@angular/core';

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
      claimed: 200
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      balance: 700,
      claimed: 300
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
  
}