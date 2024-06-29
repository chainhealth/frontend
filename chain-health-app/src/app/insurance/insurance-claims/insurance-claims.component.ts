import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-insurance-claims',
  templateUrl: './insurance-claims.component.html',
  styleUrls: ['./insurance-claims.component.scss']
})
export class InsuranceClaimsComponent implements OnInit, AfterViewInit {
  selectedPatient: any = {};
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = ['prescriptionId', 'state'];
  patient = "";
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const patientId = params['patientId'];
      this.patient = patientId;
      this.patient = params['patientId'];
      if (patientId) {
        this.fetchPrescriptions(patientId);
        // localStorage.setItem('username', patientId);/////////////////
      } else {
        this.router.navigate(['/insurance-claims']);
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchPrescriptions(patientId: string): void {
    this.apiService.getInsuranceClaims(patientId).subscribe({
      next: (response) => {
        this.selectedPatient = response;
        this.dataSource.data = response.prescription;
      },
      error: (error) => {
        console.error('Error fetching prescriptions:', error);
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  redirectToPrescription(patientId: string, prescriptionId: string): void {
    console.log(this.patient);
    localStorage.setItem('username', this.patient);
    this.router.navigate([`insurance-claims/${this.patient}/prescription/${prescriptionId}`])
      .catch(error => {
        console.error('Navigation error:', error);
      });
  }
  
  // redirectToPrescription(username: string, prescriptionId: string): void {
  //   this.router.navigate(['insurance-claims/:patientId/prescription/:id', this.patient]);
  // }
}
