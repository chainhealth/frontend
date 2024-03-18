import { Component } from '@angular/core';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.scss'
})
export class DoctorComponent {
  patientFound: boolean = false;
  searchPerformed: boolean = false;
  patientId: number | null = null; // Set initial value to null  
  patients: any[] = [
    { 
      id: 1, 
      name: 'John Doe', 
      age: 30,
      medicalHistory: {
        chronicDiseases: ["Diabetes", "High Blood Pressure"],
        allergies: ["Peanuts"],
        surgeries: ["Appendectomy in 2015"],
        medications: [
          {
            name: "Metformin",
            dosage: "500mg",
            frequency: "Twice daily",
          },
        ],
      }
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      age: 25,
      medicalHistory: {
        chronicDiseases: ["Asthma"],
        allergies: ["Shellfish"],
        surgeries: [],
        medications: [
          {
            name: "Albuterol",
            dosage: "2mg",
            frequency: "As needed",
          },
        ],
      }
    },
    { 
      id: 3, 
      name: 'David Johnson', 
      age: 40,
      medicalHistory: {
        chronicDiseases: ["Heart disease"],
        allergies: [],
        surgeries: ["Knee replacement in 2018"],
        medications: [
          {
            name: "Atorvastatin",
            dosage: "20mg",
            frequency: "Once daily",
          },
        ],
      }
    }
  ];
  patient: any = {}; // Placeholder for patient details
  oldPrescriptions: string[] = []; // Placeholder for old prescriptions

  searchPatient() {
    // Convert input value to a number if it's not null
    const id = this.patientId !== null ? +this.patientId : null;
    console.log('Searching with ID:', id); // Log the converted ID
    
    if (id !== null) {
      this.patient = this.patients.find(p => {
        console.log('Patient ID in array:', p.id); // Log the patient ID from the array
        return p.id === id;
      });
      if (this.patient) {
        this.patientFound = true;
        this.searchPerformed = true;
        this.oldPrescriptions = ['Prescription 1', 'Prescription 2']; // Placeholder data for prescriptions
      } else {
        this.patientFound = false;
        this.searchPerformed = true;
        this.oldPrescriptions = [];
      }
    }
  }
  // handleReportSubmission(event: { report: string, prescription: string }) {
  //   // Handle the submitted report and prescription
  //   const { report, prescription } = event;
  //   console.log('Submitted report:', report);
  //   console.log('Submitted prescription:', prescription);
  //   // Perform any further actions, such as saving the data
  // }


  showReportSection: boolean = false; // Flag to toggle report section visibility

  toggleReportSection() {
    this.showReportSection = !this.showReportSection;
  }

  handleReportSubmission(eventData: { report: string, prescriptions: string[] }) {
    // Handle the submitted report and prescriptions here
    console.log('Report:', eventData.report);
    console.log('Prescriptions:', eventData.prescriptions);
  }
      
}



