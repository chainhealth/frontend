/**
 * Pharmacy Component
 * 
 * Allows pharmacy worker to search for patient using ID and if found, the prescriptions 
 * appear in a table and each one has a sell button that sends an api call to confirm selling.
 * if a row is clicked, the user is redirected to the prescription component.
 *  
 */
import { Component, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service'; // Make sure to import ApiService

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.scss']
})
export class PharmacyComponent implements AfterViewInit {
  isLoading: boolean = false;
  
  @Input() isPharmacyView: boolean = true;
  patientFound: boolean = false;
  searchPerformed: boolean = false;
  patientId: string = "";
  patient: any = {};
  patientName: string = "";
  
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['id', 'state', 'action']; // Adjusted columns
  
  // @ViewChild specifies that you want to query for a child component or directive
  // ! indicates that TypeScript should not treat this property as possibly undefined or null,
  // ensuring it will be initialized correctly by Angular's view lifecycle
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('filterInput') filterInput!: ElementRef<HTMLInputElement>;

  constructor(private router: Router, private apiService: ApiService) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter() {
    const filterValue = this.filterInput.nativeElement.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewPrescription(prescriptionId: string) {
    this.router.navigate(['/pharmacy/prescription', prescriptionId]);
  }

  sellPrescription(event: Event, prescription: any) {
    event.stopPropagation();
    this.isLoading = true;
    this.apiService.confirmPrescriptionPharmacy(this.patientId, prescription.prescriptionId).subscribe(
      response => {
        console.log(response);
        this.isLoading = false;
        if (response.state === 'confirmed') {
          prescription.state = 'confirmed';
          console.log('Prescription confirmed:', prescription);
        } else {
          console.log('Prescription could not be confirmed:', response);
        }
      },
      error => {
        this.isLoading = false;
        console.error('Error confirming prescription:', error);
      }
    );
  }

  searchPatient(patientId: string) {
    localStorage.setItem('username', patientId);
    this.patientId = patientId;
    

    if (!patientId) {
      this.patientFound = false;
      this.patient = null;
      this.dataSource.data = [];
      return;
    }
    
    this.isLoading = true;
    this.apiService.searchPatient(patientId).subscribe(
      (data: any) => {
        this.isLoading = false;
        if (data) {
          this.patientFound = true;
          this.patient = data;
          this.dataSource.data = data.prescription;
          this.patientName = data.firstName + " " + data.lastName;
          
          // Reinitialize paginator and sort after updating data source
          setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          });
          console.log('Patient found:', data);
        } else {
          this.patientFound = false;
          this.dataSource.data = [];
          console.log('No patient found with ID:', patientId);
        }
        this.searchPerformed = true;
      },
      error => {
        this.isLoading = false;
        this.patientFound = false;
        this.dataSource.data = [];
        console.error('Error fetching patient data:', error);
      }
    );
  }
}
