import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss']
})
export class InsuranceComponent {
  patients: any[] = [
    { 
      id: 1, 
      name: 'John Doe', 
      balance: 500,
      claimed: 200,
      prescriptions: [
        { id: 1, name: 'Prescription 1', state: 'Approved' },
        { id: 2, name: 'Prescription 2', state: 'Pending' }
      ]
    },
    { 
      id: 12, 
      name: 'John Doe', 
      balance: 500,
      claimed: 200,
      prescriptions: [
        { id: 1, name: 'Prescription 1', state: 'Approved' },
        { id: 2, name: 'Prescription 2', state: 'Pending' }
      ]
    },
    { 
      id: 13, 
      name: 'John Doe', 
      balance: 500,
      claimed: 200,
      prescriptions: [
        { id: 1, name: 'Prescription 1', state: 'Approved' },
        { id: 2, name: 'Prescription 2', state: 'Pending' }
      ]
    },
    { 
      id: 14, 
      name: 'John Doe', 
      balance: 500,
      claimed: 200,
      prescriptions: [
        { id: 1, name: 'Prescription 1', state: 'Approved' },
        { id: 2, name: 'Prescription 2', state: 'Pending' }
      ]
    },
    { 
      id: 15, 
      name: 'John Doe', 
      balance: 500,
      claimed: 200,
      prescriptions: [
        { id: 1, name: 'Prescription 1', state: 'Approved' },
        { id: 2, name: 'Prescription 2', state: 'Pending' }
      ]
    },
    { 
      id: 16, 
      name: 'John Doe', 
      balance: 500,
      claimed: 200,
      prescriptions: [
        { id: 1, name: 'Prescription 1', state: 'Approved' },
        { id: 2, name: 'Prescription 2', state: 'Pending' }
      ]
    },
    { 
      id: 167, 
      name: 'John Doe', 
      balance: 500,
      claimed: 200,
      prescriptions: [
        { id: 1, name: 'Prescription 1', state: 'Approved' },
        { id: 2, name: 'Prescription 2', state: 'Pending' }
      ]
    },
    { 
      id: 165, 
      name: 'John Doe', 
      balance: 500,
      claimed: 200,
      prescriptions: [
        { id: 1, name: 'Prescription 1', state: 'Approved' },
        { id: 2, name: 'Prescription 2', state: 'Pending' }
      ]
    },
    { 
      id: 2655, 
      name: 'Jane Smith', 
      balance: 700,
      claimed: 300,
      prescriptions: [
        { id: 1, name: 'Prescription 3', state: 'Approved' },
        { id: 2, name: 'Prescription 4', state: 'Pending' }
      ]
    }
  ];

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'id', 'balance', 'claimed'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router) {
    this.dataSource = new MatTableDataSource(this.patients);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  viewPrescriptions(patientId: number) {
    this.router.navigate(['/insurance-claims', patientId]);
  }
}
