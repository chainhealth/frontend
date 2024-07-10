import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.scss']
})
export class PrescriptionsComponent implements OnInit, AfterViewInit {
  isLoading: boolean = false;
  prescriptionId!: string;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = ['name', 'dosage', 'frequency'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.prescriptionId = params['id'];
      this.fetchPrescriptionData();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchPrescriptionData(): void {
    this.isLoading = true;
    const patientUsername = localStorage.getItem('username');
    if (patientUsername && this.prescriptionId) {
      this.apiService.getPrescription(patientUsername, this.prescriptionId).subscribe(
        data => {
          console.log(data);
          this.dataSource.data = data.medicines;
          this.isLoading = false;
        },
        error => {
          console.error('Error fetching prescription data:', error);
          this.isLoading = false;
        }
      );
    } else {
      console.error('Missing patient username or prescription ID');
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
