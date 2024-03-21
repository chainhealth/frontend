// pharmacy.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.scss']
})
export class PharmacyComponent {
  @Input() isPharmacyView: boolean = true;
  patientFound: boolean = false;
  searchPerformed: boolean = false;
  patientId: number | null = null; 
  patients: any[] = [
    { 
      id: 1, 
      name: 'John Doe', 
      balance: 500,
      prescriptions: [
        { name: 'Prescription 1', state: 'Approved' },
        { name: 'Prescription 2', state: 'Pending' },
      ]
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      balance: 700,
      prescriptions: [
        { name: 'Prescription 3', state: 'Approved' },
        { name: 'Prescription 4', state: 'Pending' },
      ]
    }
  ];
  patient: any = {}; 
  purchaseEvent: any;
  filteredPatients: any[] = [];

  searchPatient(patientIdString: string) {
    const patientId = parseInt(patientIdString, 10);
    console.log('input: ', patientId);
    if (isNaN(patientId)) {
      this.patient = null; // Reset patient if input is not a valid number
      return;
    }
  
    // Reset patient to null before searching
    this.patient = null;
  
    // Loop through patients array to find the patient with the matching ID
    for (const patient of this.patients) {
      if (patient.id === patientId) {
        this.patientFound = true;
        this.patient = patient;
        console.log("found", patient.id);
        break; // Exit loop once the patient is found
      }
    }
  }
    
  isLoading: boolean = false;

  sellPrescription(prescription: any) {
    this.isLoading = true; // Show loading component
    // Simulate API call delay with setTimeout
    setTimeout(() => {
      if (prescription.state === 'Approved') {
        prescription.state = 'Purchased';
        console.log('Prescription purchased:', prescription);
      } else {
        console.log('Cannot purchase prescription. State is not "Approved".');
      }
      this.isLoading = false; // Hide loading component after 3 seconds
    }, 3000); // Wait for 3 seconds  }
}
}
