import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss']
})
export class InsuranceComponent implements OnInit {
  userData: any[] = []; // Initialize empty array

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['firstName', 'lastName', 'insuranceId', 'insuranceState', 'remainingBalance', 'claimedBalance'];

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
    console.log('Filter value:', filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  fetchInsuranceData() {
    this.apiService.getHomePage().subscribe({
      next: (response) => {
        if (response.userType === 'Insurance' && response.userData) {
          this.userData = response.userData;
          this.dataSource.data = this.userData;
        } else {
          console.error('Invalid response format for insurance data');
        }
      },
      error: (error) => {
        console.error('Error fetching insurance data:', error);
      }
    });
  }
}
