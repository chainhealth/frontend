import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ApiService } from '../api.service'; // Make sure to import ApiService

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.scss']
})
export class PharmacyComponent implements AfterViewInit {
  @Input() isPharmacyView: boolean = true;
  patientFound: boolean = false;
  searchPerformed: boolean = false;
  patientId: string = "";//| null = null;
  patient: any = {};
  isLoading: boolean = false;
  patientName: string = "";
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['id', 'state', 'action']; // Adjusted columns

  constructor(private router: Router, private apiService: ApiService) {}

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

  viewPrescription(prescriptionId: string) {
    // console.log(this.patientId);
    // localStorage.setItem('username', this.patientId);
    this.router.navigate(['/pharmacy/prescription', prescriptionId]);
  }

  sellPrescription(prescription: any) {
    if (prescription.state === 'purchased') {
      this.isLoading = true;
      setTimeout(() => {
        prescription.state = 'sold';
        console.log('Prescription sold:', prescription);
        this.isLoading = false;
      }, 3000);
    } else {
      console.log('Cannot sell prescription. State is not "purchased".');
    }
  }

  searchPatient(patientId: string) {
    console.log('Searching for patient with ID:', patientId);
    localStorage.setItem('username', patientId);
    this.searchPerformed = true;

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
          ////////////////////////////////////////////////////////////////////////////
         //////// IM USING THE ID NOT THE NAME //////////////////////////////////////
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
