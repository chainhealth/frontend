/**
 * Insurance Component
 * 
 * This component fetches and displays insurance data in table by material.
 * It includes functionalities for filtering data, paginantion, sorting columns, and navigating to insurance claims.
 */
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss']
})
export class InsuranceComponent implements OnInit {

  isLoading: boolean = false; // Flag to indicate loading state
  
  userData: any[] = []; // Initialize empty array

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['firstName', 'lastName', 'patientId', 'insuranceId', 'insuranceState', 'remainingBalance', 'claimedBalance'];

  // @ViewChild specifies that you want to query for a child component or directive
  // ! indicates that TypeScript should not treat this property as possibly undefined or null,
  // ensuring it will be initialized correctly by Angular's view lifecycle
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('filterInput') filterInput!: ElementRef<HTMLInputElement>;

  constructor(private apiService: ApiService, private router: Router) {
    this.dataSource = new MatTableDataSource(this.userData);
  }

  ngOnInit(): void {
    this.fetchInsuranceData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter() {
    const filterValue = this.filterInput.nativeElement.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  fetchInsuranceData() {
    this.isLoading = true;
    this.apiService.getHomePage().subscribe({
      next: (response) => {
        if (response.userType === 'Insurance' && response.userData) {
          this.userData = response.userData;
          this.dataSource.data = this.userData;
        } else {
          window.alert('Something Wrong happened. Please try again later.');
          // console.error('Invalid response format for insurance data');
        }
        this.isLoading = false;

      },
      error: (error) => {
        console.error('Error fetching insurance data:', error);
        this.isLoading = false;

      }
    });
  }

  viewPrescriptions(patientId: string) {
    this.router.navigate(['/insurance-claims', patientId]);
  }
}
