import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-insurance-claims',
  templateUrl: './insurance-claims.component.html',
  styleUrls: ['./insurance-claims.component.scss']
})
export class InsuranceClaimsComponent implements OnInit, AfterViewInit {
  selectedPatient: any = {};
  prescriptionId: number | undefined; // Define prescriptionId as a number
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'name', 'state'];
  patients: any[] = [
    { 
      id: "ins1", 
      name: 'John Doe', 
      balance: 500,
      claimed: 200,
      prescriptions: [
        { id: 1, name: 'Prescription 1', state: 'Approved' },
        { id: 2, name: 'Prescription 2', state: 'Pending' },
        { id: 2, name: 'Prescription 2', state: 'Pending' },
        { id: 2, name: 'Prescription 2', state: 'Pending' },
        { id: 2, name: 'Prescription 2', state: 'Pending' },
        { id: 2, name: 'Prescription 2', state: 'Pending' },
        { id: 2, name: 'Prescription 2', state: 'Pending' },
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
      id: 27, 
      name: 'Jane Smith', 
      balance: 700,
      claimed: 300,
      prescriptions: [
        { id: 1, name: 'Prescription 3', state: 'Approved' },
        { id: 2, name: 'Prescription 4', state: 'Pending' }
      ]
    },    { 
      id: 6, 
      name: 'Jane Smith', 
      balance: 700,
      claimed: 300,
      prescriptions: [
        { id: 1, name: 'Prescription 3', state: 'Approved' },
        { id: 2, name: 'Prescription 4', state: 'Pending' }
      ]
    },    { 
      id: 2, 
      name: 'Jane Smith', 
      balance: 700,
      claimed: 300,
      prescriptions: [
        { id: 1, name: 'Prescription 3', state: 'Approved' },
        { id: 2, name: 'Prescription 4', state: 'Pending' }
      ]
    },    { 
      id: 3, 
      name: 'Jane Smith', 
      balance: 700,
      claimed: 300,
      prescriptions: [
        { id: 1, name: 'Prescription 3', state: 'Approved' },
        { id: 2, name: 'Prescription 4', state: 'Pending' }
      ]
    },    { 
      id: 4, 
      name: 'Jane Smith', 
      balance: 700,
      claimed: 300,
      prescriptions: [
        { id: 1, name: 'Prescription 3', state: 'Approved' },
        { id: 2, name: 'Prescription 4', state: 'Pending' }
      ]
    },    { 
      id: 5, 
      name: 'Jane Smith', 
      balance: 700,
      claimed: 300,
      prescriptions: [
        { id: 1, name: 'Prescription 3', state: 'Approved' },
        { id: 2, name: 'Prescription 4', state: 'Pending' }
      ]
    },
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const patientId = params['patientId'];
      this.prescriptionId = params['prescriptionId'];
  
      if (patientId) {
        this.fetchPrescriptions(patientId);
      } else {
        this.router.navigate(['/insurance-claims']);
      }
    });
  }
  

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchPrescriptions(patientId: number): void {
    const patient = this.patients.find(p => p.id === patientId);
    if (patient) {
      this.selectedPatient = patient;
      this.dataSource.data = patient.prescriptions;
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  redirectToPrescription(patientId: number, prescriptionId: number): void {
    this.router.navigate(['/insurance-claims', patientId, 'prescription', prescriptionId]);
  }
}
