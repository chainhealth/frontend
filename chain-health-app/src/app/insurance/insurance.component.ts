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
  userData: any[] = [
    {
      firstName: 'Seifeldin',
      lastName: 'Sami',
      insuranceId: 'ins1',
      insuranceState: 'active',
      remainingBalance: '100',
      claimedBalance: '500'
    },
    {
      firstName: 'Aisha',
      lastName: 'Khan',
      insuranceId: 'ins222',
      insuranceState: 'active',
      remainingBalance: '200',
      claimedBalance: '700'
    }
  ];

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['firstName', 'lastName', 'insuranceId', 'insuranceState', 'remainingBalance', 'claimedBalance'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('filterInput') filterInput!: ElementRef<HTMLInputElement>;

  constructor(private router: Router) {
    this.dataSource = new MatTableDataSource(this.userData);
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
}
