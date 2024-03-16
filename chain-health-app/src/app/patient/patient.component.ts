import { Component } from '@angular/core';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss'
})
export class PatientComponent {

  // these will be passed down to patient details by @Input
  patientBalance: number = 500; 
  patientPrescriptions: any[] = [
    { name: 'Prescription 1', state: 'Pending' },
    { name: 'Prescription 2', state: 'Rejected' },
    { name: 'Prescription 3', state: 'Purchased' }
  ]; // Example prescriptions


  // searchData: any[] = []; // Data to be searched, e.g., patient data
  filteredPrescriptions: any[] = []; // Filtered data based on search query
  searchTerm: string = '';


  onSearch(searchTerm: string) {
    console.log("input: ", searchTerm);
    this.searchTerm = searchTerm; // Update searchTerm property
    if (!searchTerm) {
      this.filteredPrescriptions = []; // Clear filtered prescriptions if search term is empty
      return;
    }

    this.filteredPrescriptions = this.patientPrescriptions.filter(prescription =>
      prescription.name === searchTerm
    );
  }
}
