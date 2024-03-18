import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-doctor-report',
  templateUrl: './doctor-report.component.html',
  styleUrl: './doctor-report.component.scss'
})
export class DoctorReportComponent {
  report: string = ''; // For the report input
  prescriptions: string[] = []; // For the list of prescriptions
  prescription: string = ''; // For the prescription input

  @Output() reportSubmitted = new EventEmitter<{ report: string, prescriptions: string[] }>();

  addPrescription() {
    if (this.prescription.trim()) {
      this.prescriptions.push(this.prescription.trim());
      this.prescription = ''; // Clear the input field after adding prescription
    }
  }

  submitReport() {
    this.reportSubmitted.emit({ report: this.report, prescriptions: this.prescriptions });
  }
}