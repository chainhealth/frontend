import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

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
  patientBalance: number = 500;

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'state', 'action'];

  patientPrescriptions: any[] = [
    { id: 1, name: 'Prescription 1', state: 'Pending' },
    { id: 2, name: 'Prescription 2', state: 'Rejected' },
    { id: 3, name: 'Prescription 3', state: 'Approved' },
    { id: 4, name: 'Prescription 4', state: 'Pending' },
    { id: 5, name: 'Prescription 5', state: 'Rejected' },
    { id: 6, name: 'Prescription 6', state: 'Purchased' },
  ]; // Example prescriptions

  constructor(private router: Router) {
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

  onRowClick(row: any) {
    this.router.navigate(['/patient/prescription', row.id]);
  }
}
