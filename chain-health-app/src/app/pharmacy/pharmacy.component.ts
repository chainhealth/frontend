import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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
        { name: 'Prescription 4', state: 'Pending' },
        { name: 'Prescription 4', state: 'Pending' },
        { name: 'Prescription 4', state: 'Pending' },
        { name: 'Prescription 4', state: 'Pending' },
        { name: 'Prescription 4', state: 'Pending' },
        { name: 'Prescription 4', state: 'Pending' },
      ]
    },
  ];
  patient: any = {};
  purchaseEvent: any;
  filteredPatients: any[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('filterInput') filterInput!: ElementRef<HTMLInputElement>;
  @ViewChild('paginator') matPaginator!: MatPaginator;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]); // Initialize with an empty array
  displayedColumns: string[] = ['name', 'state', 'action'];

  constructor() {
    // Initialize dataSource without any data initially
    this.dataSource = new MatTableDataSource<any>();
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

  sellPrescription(prescription: any) {
    this.isLoading = true; // Show loading component
    // Simulate API call delay with setTimeout
    setTimeout(() => {
      if (prescription.state === 'Approved') {
        prescription.state = 'Sold';
        console.log('Prescription sold:', prescription);
      } else {
        console.log('Cannot sell prescription. State is not "Approved".');
      }
      this.isLoading = false; // Hide loading component after 3 seconds
    }, 3000); // Wait for 3 seconds
  }

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
        this.dataSource.data = patient.prescriptions; // Set data source with patient's prescriptions
        console.log("found", patient.id);
        break; // Exit loop once the patient is found
      }
    }
  }
}