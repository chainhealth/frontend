/**
 * Insurance Claims Component
 *
 * Displays prescriptions related to a specific patient for insurance claims.
 * Allows filtering and sorting of prescription data and navigation to detailed prescription view.
 */

import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-insurance-claims',
  templateUrl: './insurance-claims.component.html',
  styleUrls: ['./insurance-claims.component.scss'],
})
export class InsuranceClaimsComponent implements OnInit, AfterViewInit {
  isLoading: boolean = false; // flag to indicate loading state
  selectedPatient: any = {};
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = ['prescriptionId', 'state'];
  patient = '';

  // @ViewChild specifies that you want to query for a child component or directive
  // ! indicates that TypeScript should not treat this property as possibly undefined or null,
  // ensuring it will be initialized correctly by Angular's view lifecycle
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filterInput') filterInput!: ElementRef<HTMLInputElement>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    // params refer to var name after ':' like /insurance-claims/:patientId
    this.route.params.subscribe((params) => {
      const patientId = params['patientId'];
      this.patient = patientId;
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

  fetchPrescriptions(patientId: string): void {
    this.isLoading = true;
    this.apiService.getInsuranceClaims(patientId).subscribe({
      next: (response) => {
        this.selectedPatient = response;
        this.dataSource.data = response.prescription;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching prescriptions:', error);
        this.isLoading = false;
      },
    });
  }

  applyFilter() {
    const filterValue = this.filterInput.nativeElement.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  redirectToPrescription(patientId: string, prescriptionId: string): void {
    // console.log(this.patient);
    localStorage.setItem('username', this.patient);
    this.router
      .navigate([
        `insurance-claims/${this.patient}/prescription/${prescriptionId}`,
      ])
      .catch((error) => {
        window.alert('Something wrong happened. Please try again later.');
        console.error('Navigation error:', error);
      });
  }
}
