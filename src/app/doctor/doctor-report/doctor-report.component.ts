/**
 * Doctor Report Component
 *
 * This component allows doctors to write and submit a medical report which includes the description
 * of the report, medcine name(s), frequency and dosage then emits these responses the doctor 
 * component through the Emitters: prescriptionAdded and prescriptionAdded which then handles
 * the data 
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-doctor-report',
  templateUrl: './doctor-report.component.html',
  styleUrls: ['./doctor-report.component.scss']
})
export class DoctorReportComponent {
  report: string = ''; // For the report input
  prescriptions: { name: string, dosage: string, frequency: string }[] = []; // for the list of prescriptions
  medicationName: string = '';
  dosage: string = ''; 
  frequency: string = '';

  // emitters to send data to parent component (DoctorComponent)
  @Output() reportSubmitted = new EventEmitter<{ report: string, prescriptions: { name: string, dosage: string, frequency: string }[] }>();
  @Output() prescriptionAdded = new EventEmitter<{ name: string, dosage: string, frequency: string }>();

  // get the medicines list from the doctor component
  @Input() allowedMedicines: string[] = [];
  
  addPrescription() {
    console.log(this.allowedMedicines);

    if (this.medicationName.trim() && this.dosage.trim() && this.frequency.trim()) {
      const prescription = {
        name: this.medicationName.trim(),
        dosage: this.dosage.trim(),
        frequency: this.frequency.trim()
      };
      this.prescriptions.push(prescription);
      this.prescriptionAdded.emit(prescription); // emit the added prescription to the parent component

      // clear medicine details after added
      this.medicationName = '';
      this.dosage = '';
      this.frequency = '';
    }
  }

  submitReport() {
    this.reportSubmitted.emit({ report: this.report, prescriptions: this.prescriptions });
    // Clear the report and prescriptions after submitting
    this.report = '';
    this.prescriptions = [];
  }
}
