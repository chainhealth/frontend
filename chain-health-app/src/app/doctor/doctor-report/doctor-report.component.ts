import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-doctor-report',
  templateUrl: './doctor-report.component.html',
  styleUrls: ['./doctor-report.component.scss']
})
export class DoctorReportComponent {
  report: string = ''; // For the report input
  prescriptions: { name: string, dosage: string, frequency: string }[] = []; // For the list of prescriptions
  medicationName: string = ''; // For the medication name input
  dosage: string = ''; // For the dosage input
  frequency: string = ''; // For the frequency input

  @Output() reportSubmitted = new EventEmitter<{ report: string, prescriptions: { name: string, dosage: string, frequency: string }[] }>();
  @Output() prescriptionAdded = new EventEmitter<{ name: string, dosage: string, frequency: string }>();

  addPrescription() {
    if (this.medicationName.trim() && this.dosage.trim() && this.frequency.trim()) {
      const prescription = { 
        name: this.medicationName.trim(), 
        dosage: this.dosage.trim(), 
        frequency: this.frequency.trim() 
      };
      this.prescriptions.push(prescription);
      this.medicationName = ''; // Clear the medication name input field after adding prescription
      this.dosage = ''; // Clear the dosage input field after adding prescription
      this.frequency = ''; // Clear the frequency input field after adding prescription
      this.prescriptionAdded.emit(prescription); // Emit the added prescription to the parent component
    }
  }

  submitReport() {
    this.reportSubmitted.emit({ report: this.report, prescriptions: this.prescriptions });
  }
}
