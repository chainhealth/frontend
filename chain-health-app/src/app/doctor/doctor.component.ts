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
  patientId: string | null = null; // Patient ID as string or null
  patient: any = {}; // Placeholder for patient details
  oldPrescriptions: string[] = []; // Placeholder for old prescriptions

  constructor(private apiService: ApiService) {}

  searchPatient(id: string) {
    console.log('Searching with ID:', id);

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
        this.patientId = id; // Assign patientId here
      },
      error: (error) => {
        console.error('Error fetching patient data:', error);
        this.patientFound = false;
        this.searchPerformed = true;
        this.oldPrescriptions = [];
      }
    });
  }

  showReportSection: boolean = false; // Flag to toggle report section visibility

  toggleReportSection() {
    this.showReportSection = !this.showReportSection;
  }

  handleReportSubmission(eventData: { report: string, prescriptions: { name: string, dosage: string, frequency: string }[] }) {
    console.log('Report:', eventData.report);
    console.log('Prescriptions:', eventData.prescriptions);

    // Ensure this.patientId is not null before calling writePrescription
    if (this.patientId) {
      // Prepare data to send to API
      const prescriptionData = {
        report: eventData.report,
        medicine: eventData.prescriptions.map(p => ({
          name: p.name,
          dosage: +p.dosage, // Convert dosage to number
          frequency: +p.frequency // Convert frequency to number
        }))
      };

      // Call API service to submit prescription
      this.apiService.writePrescription(this.patientId, prescriptionData).subscribe(
        (response) => {
          console.log('Prescription submitted successfully:', response);
          // Handle success (e.g., show confirmation)
        },
        (error) => {
          console.error('Error submitting prescription:', error);
          // Handle error (e.g., show error message)
        }
      );
    } else {
      console.error('Patient ID is null or undefined.');
      // Handle the case where patientId is null (optional)
    }
  }

  handlePrescriptionAdded(prescription: { name: string, dosage: string, frequency: string }) {
    console.log('Prescription added:', prescription);
  }
}
