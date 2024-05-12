import { Component, ViewChild, ElementRef } from '@angular/core';
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
  // prescirptions here are not displayed on this page, api will call again in insurance claims (the detailed view of each patient when clicked upon)
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
      id: 2, 
      name: 'Jane Smith', 
      balance: 700,
      claimed: 300,
      prescriptions: [
        { id: 1, name: 'Prescription 3', state: 'Approved' },
        { id: 2, name: 'Prescription 4', state: 'Pending' }
      ]
    },
    { 
      id: 2343436, 
      name: 'sadasdf Smith', 
      balance: 700,
      claimed: 300,
      prescriptions: [
        { id: 5461, name: 'Prescription 3', state: 'Approved' },
        { id: 26775, name: 'Prescription 4', state: 'Pending' }
      ]
    },
    { 
      id: 6565, 
      name: 'Jane Smith', 
      balance: 745600,
      claimed: 34600,
      prescriptions: [
        { id: 45771, name: 'Prescription 3', state: 'Approved' },
        { id: 2, name: 'Prescription 4', state: 'Pending' }
      ]
    },
    { 
      id: 46572, 
      name: 'Jane Smith', 
      balance: 700,
      claimed: 300,
      prescriptions: [
        { id: 1, name: 'Prescription 3', state: 'Approved' },
        { id: 2, name: 'Prescription 4', state: 'Pending' }
      ]
    },
    { 
      id: 6564352, 
      name: 'Jane Smith', 
      balance: 700,
      claimed: 300,
      prescriptions: [
        { id: 1, name: 'Prescription 3', state: 'Approved' },
        { id: 2, name: 'Prescription 4', state: 'Pending' }
      ]
    },
    { 
      id: 2456, 
      name: 'Jane Smith', 
      balance: 700,
      claimed: 300,
      prescriptions: [
        { id: 1, name: 'Prescription 3', state: 'Approved' },
        { id: 2, name: 'Prescription 4', state: 'Pending' }
      ]
    },
    { 
      id: 2574, 
      name: 'Jane Smith', 
      balance: 700,
      claimed: 300,
      prescriptions: [
        { id: 2341, name: 'Prescription 3', state: 'Approved' },
        { id: 2234, name: 'Prescription 4', state: 'Pending' }
      ]
    },
    { 
      id: 56887652, 
      name: 'mina Smith', 
      balance: 700,
      claimed: 300,
      prescriptions: [
        { id: 22, name: 'Prescription 3', state: 'Approved' },
        { id: 232, name: 'Prescription 4', state: 'Pending' }
      ]
    },
    { 
      id: 2123, 
      name: 'peter Smith', 
      balance: 700,
      claimed: 300,
      prescriptions: [
        { id: 11, name: 'Prescription 33', state: 'Approved' },
        { id: 2213, name: 'Prescription 43', state: 'Pending' }
      ]
    },
  ];

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'id', 'balance', 'claimed'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('filterInput') filterInput!: ElementRef<HTMLInputElement>;

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

  applyFilter() {
    const filterValue = this.filterInput.nativeElement.value;
    console.log('Filter value:', filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
}
