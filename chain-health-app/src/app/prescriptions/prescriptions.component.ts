import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


// todo method to take id and send it using api and returning real results



@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrl: './prescriptions.component.scss'
})
export class PrescriptionsComponent {
  prescriptionId!: number;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = ['name', 'dosage', 'frequency'];
  prescriptions: any[] = [
    { name: 'Medication 1', dosage: '500mg', frequency: 'Once a day' },
    { name: 'Medication 2', dosage: '250mg', frequency: 'Twice a day' },
    { name: 'Medication 3', dosage: '250mg', frequency: 'Twice a day' },
    { name: 'Medication 4', dosage: '250mg', frequency: 'Twice a day' },
    { name: 'Medication 5', dosage: '250mg', frequency: 'Twice a day' },
    { name: 'Medication 6', dosage: '250mg', frequency: 'Twice a day' },
    { name: 'Medication 7', dosage: '250mg', frequency: 'Twice a day' },
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.prescriptionId = +params['id'];
      this.dataSource.data = this.prescriptions; // Replace with actual prescription data based on ID
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
