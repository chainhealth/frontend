/**
 * Doctor Component
 *
 * This component handles the doctor's interaction with the patient data, first the doctor inputs a patient id to
 * search for. If found, the data regarding the patient is displayed. 
 * Reports can also be submitted with the report data being emitted from a nested component called DoctorReport.
 */

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit{
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
  allowedMedicines: string[] = [];
  userError: boolean = false; // for dosage and freq if not numbers
  
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

  ngOnInit(){
    this.apiService.getMedicines().subscribe(
      (data) => {
        this.allowedMedicines = data.medicineNames;
      },
      (error) => {
        console.error('Error fetching medicines:', error);
      }
    );
  }

  // handle the submission of the report data by getting the report from the child component DoctorReportComponent
  handleReportSubmission(eventData: { report: string, prescriptions: { name: string, dosage: string, frequency: string }[] }) {
    // ensure this.patientId is not null before calling writePrescription
    if (this.patientId) {
      // prepare data to send to api
      this.userError = false; // to check if for dosage and frequency errors
      const prescriptionData = {
        report: eventData.report,
        medicine: eventData.prescriptions.map(p => {
          const dosage = +p.dosage;
          const frequency = +p.frequency;
          
          if (isNaN(dosage) || isNaN(frequency)) {
            this.userError = true;
          }
  
          return {
            name: p.name,
            dosage: dosage,
            frequency: frequency
          };
        })
      };
      if (!this.userError) {
        this.isLoading = true; // set loading state to true
        // call api service to submit prescription
        this.apiService.writePrescription(this.patientId, prescriptionData).subscribe(
          (response) => {
            this.isSuccess = true;
            this.successMessage = 'Report submitted successfully!';
            this.isLoading = false;
            this.isError = false;
            if (this.patientId) {
              this.searchPatient(this.patientId); // Call searchPatient with the current patientId
            }
          },
          (error) => {
            console.error('Error submitting prescription:', error);
            this.isSuccess = false;
            this.isError = true; 
            this.errorMessage = 'An error occurred. Please try again.';
            this.isLoading = false; 
          }
        );
      } else{
          this.isSuccess = false;
          this.isError = true; 
          this.isLoading = false;
          this.userError = false 
        }
      }
      else {
       console.error('Patient ID is null or undefined.');
     }
  }
  

  handlePrescriptionAdded(prescription: { name: string, dosage: string, frequency: string }) {
    console.log('Prescription added:', prescription);
  }
}
