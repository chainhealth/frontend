/**
 * Doctor Component
 *
 * This component handles the doctor's interaction with the patient data, first the doctor inputs a patient id to
 * search for. If found, the data regarding the patient is displayed. 
 * Reports can also be submitted with the report data being emitted from a nested component called DoctorReport.
 */

import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent {
  patientFound: boolean = false;
  searchPerformed: boolean = false;
  patientId: string | null = null;
  patient: any = {}; // placeholder for patient details
  oldPrescriptions: string[] = []; // placeholder for old prescriptions
  isLoading: boolean = false; // flag to indicate loading state
  isError: boolean = false; // flag to indicate error state
  errorMessage: string = ''; // error message to display
  isSuccess: boolean = false; // flag to indicate success state
  successMessage: string = ''; // success message to display
  showReportSection: boolean = false; // flag to toggle report section visibility

  constructor(private apiService: ApiService) {}

  // method to search for patients by ID
  searchPatient(id: string) {
    this.isLoading = true; // Set loading state to true

    // api call to get patient details
    this.apiService.searchPatient(id).subscribe({
      next: (response) => {
        console.log('Patient data:', response);
        this.patient = {
          id: id,
          name: `${response.firstName} ${response.lastName}`,
          age: response.age,
          medicalHistory: {
            chronicDiseases: response.chronicDiseases,
            allergies: response.allergies,
            surgeries: response.surgeries,
            medications: response.medications
          }
        };
        this.patientFound = true;
        this.searchPerformed = true;
        this.oldPrescriptions = response.oldPrescription;
        this.patientId = id;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching patient data:', error);
        this.patientFound = false;
        this.searchPerformed = true;
        this.oldPrescriptions = [];
        this.isLoading = false; 
      }
    });
  }

  // method to toggle report section visibility 
  toggleReportSection() {
    this.showReportSection = !this.showReportSection;
  }

  // handle the submission of the report data by getting the report from the child component DoctorReportComponent
  handleReportSubmission(eventData: { report: string, prescriptions: { name: string, dosage: string, frequency: string }[] }) {

    // ensure this.patientId is not null before calling writePrescription
    if (this.patientId) {
      // prepare data to send to api
      const prescriptionData = {
        report: eventData.report,
        medicine: eventData.prescriptions.map(p => ({
          name: p.name,
          dosage: +p.dosage, // convert dosage to number
          frequency: +p.frequency // convert frequency to number
        }))
      };

      this.isLoading = true; // set loading state to true
      // call api service to submit prescription
      this.apiService.writePrescription(this.patientId, prescriptionData).subscribe(
        (response) => {
          console.log('Prescription submitted successfully:', response);
          this.isError = false;
          this.isSuccess = true;
          this.successMessage = 'Report submitted successfully!';
          this.isLoading = false;
          if (this.patientId) {
            this.searchPatient(this.patientId); // Call searchPatient with the current patientId
          }
        },
        (error) => {
          console.error('Error submitting prescription:', error);
          this.isError = true; 
          this.errorMessage = 'An error occurred. Please try again.';
          this.isLoading = false; 
        }
      );
    } else {
      console.error('Patient ID is null or undefined.');
    }
  }

  handlePrescriptionAdded(prescription: { name: string, dosage: string, frequency: string }) {
    console.log('Prescription added:', prescription);
  }
}
