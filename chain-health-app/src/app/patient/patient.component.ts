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


  searchData: any[] = []; // Data to be searched, e.g., patient data
  filteredData: any[] = []; // Filtered data based on search query


  filterData(searchQuery: string) {
    this.filteredData = this.searchData.filter(item => {
      // Implement your filtering logic here
      // For example, check if item properties contain the search query
      return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }
}
