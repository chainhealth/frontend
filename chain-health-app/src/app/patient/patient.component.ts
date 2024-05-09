import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements AfterViewInit {
  @Input() isPharmacyView: boolean = false;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('filterInput') filterInput!: ElementRef<HTMLInputElement>;

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'state', 'action'];

  patientPrescriptions: any[] = [
    { name: 'Prescription 1', state: 'Pending' },
    { name: 'Prescription 2', state: 'Rejected' },
    { name: 'Prescription 3', state: 'Approved' },
    { name: 'Prescription 4', state: 'Pending' },
    { name: 'Prescription 5', state: 'Rejected' },
    { name: 'Prescription 6', state: 'Purchased' },
  ]; // Example prescriptions

  constructor() {
    this.dataSource = new MatTableDataSource(this.patientPrescriptions);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
