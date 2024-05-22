import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.scss']
})
export class PharmacyComponent implements AfterViewInit {
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
        { name: 'Prescription 5', state: 'Pending' },
        { name: 'Prescription 6', state: 'Pending' },
        { name: 'Prescription 7', state: 'Pending' },
        { name: 'Prescription 8', state: 'Pending' },
        { name: 'Prescription 9', state: 'Pending' },
        { name: 'Prescription 10', state: 'Pending' },
      ]
    },
  ];
  patient: any = {};
  isLoading: boolean = false;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['name', 'state', 'action'];

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

  sellPrescription(prescription: any) {
    this.isLoading = true;
    setTimeout(() => {
      if (prescription.state === 'Approved') {
        prescription.state = 'Sold';
        console.log('Prescription sold:', prescription);
      } else {
        console.log('Cannot sell prescription. State is not "Approved".');
      }
      this.isLoading = false;
    }, 3000);
  }

  searchPatient(patientIdString: string) {
    const patientId = parseInt(patientIdString, 10);
    console.log('Searching for patient with ID:', patientId);
    this.searchPerformed = true;

    if (isNaN(patientId)) {
      this.patientFound = false;
      this.patient = null;
      this.dataSource.data = [];
      return;
    }

    this.patientFound = false;
    this.patient = null;

    for (const patient of this.patients) {
      if (patient.id === patientId) {
        this.patientFound = true;
        this.patient = patient;
        this.dataSource.data = patient.prescriptions;
        // Reinitialize paginator and sort after updating data source
        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
        console.log('Patient found:', patient);
        break;
      }
    }

    if (!this.patientFound) {
      this.dataSource.data = [];
      console.log('No patient found with ID:', patientId);
    }
  }
}
