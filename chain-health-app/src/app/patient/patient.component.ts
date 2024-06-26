import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit, AfterViewInit {
  @Input() isPharmacyView: boolean = false;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('filterInput') filterInput!: ElementRef<HTMLInputElement>;
  patientBalance: number = 0; // Initial balance
  isLoading: boolean = false; // Loading state
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'state', 'action'];
  patientPrescriptions: any[] = []; // Prescriptions array

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchPatientData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  fetchPatientData(): void {
    this.apiService.getHomePage().subscribe(
      data => {
        const pageData = data.pageData;
        this.patientBalance = parseFloat(pageData.balance);
        this.patientPrescriptions = pageData.prescription.map((presc: any) => ({
          id: presc.prescId,
          name: `${presc.prescId}`,
          state: presc.prescState
        }));
        this.dataSource.data = this.patientPrescriptions;
      },
      error => {
        console.error('Error fetching patient data:', error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  purchasePrescription(prescription: any): void {
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

  onRowClick(row: any): void {
    this.router.navigate(['/patient/prescription', row.id]);

  }
}
