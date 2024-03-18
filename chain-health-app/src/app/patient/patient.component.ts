import { Component } from '@angular/core';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss',
})
export class PatientComponent {
  // these will be passed down to patient details by @Input
  patientBalance: number = 500;
  patientPrescriptions: any[] = [
    { name: 'Prescription 1', state: 'Pending' },
    { name: 'Prescription 2', state: 'Rejected' },
    { name: 'Prescription 3', state: 'Approved' },
    { name: 'Prescription 4', state: 'Pending' },
    { name: 'Prescription 5', state: 'Rejected' },
    { name: 'Prescription 6', state: 'Purchased' }, // purchased here means that patient has actually received it
  ]; // Example prescriptions

  // searchData: any[] = []; // Data to be searched, e.g., patient data
  filteredPrescriptions: any[] = []; // Filtered data based on search query
  searchTerm: string = '';
  purchaseEvent: any;

  onSearch(searchTerm: string) {
    console.log('input: ', searchTerm);
    this.searchTerm = searchTerm; // Update searchTerm property
    if (!searchTerm) {
      this.filteredPrescriptions = []; // Clear filtered prescriptions if search term is empty
      return;
    }

    this.filteredPrescriptions = this.patientPrescriptions.filter(
      (prescription) => prescription.name === searchTerm
    );
  }

  isLoading: boolean = false;

  purchasePrescription(prescription: any) {
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
    }, 3000); // Wait for 3 seconds
  }

  handlePurchaseEvent(prescription: any) {
    // Find the prescription by name
    const foundPrescription = this.patientPrescriptions.find(
      (p) => p.name === prescription.name
    );
    if (foundPrescription) {
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
      }, 3000); // Wait for 3 seconds else {
      console.log('Prescription not found.');
    }
  }
}
// purchasePrescription(prescription: any) {
//   if (prescription.state === 'Approved') {
//     prescription.state = 'Purchased';
//     console.log(this.patientPrescriptions);
//     // this.handlePurchaseEvent.emit(prescription); // Emit an event when prescription is purchased
//   } else {
//     console.log('Cannot purchase prescription. State is not "Approved".');
//   }
// }
