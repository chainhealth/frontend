import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-insurance-claims',
  templateUrl: './insurance-claims.component.html',
  styleUrl: './insurance-claims.component.scss'
})
export class InsuranceClaimsComponent {
  patientId: number | null = null;
  patients: any[] = [
    { 
      id: 1, 
      name: 'John Doe', 
      balance: 500,
      claimed: 200,
      prescriptions: [
        { id: 1, name: 'Prescription 1', state: 'Approved' },
        { id: 2, name: 'Prescription 2', state: 'Pending' },
        // Add more prescriptions as needed
      ]
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      balance: 700,
      claimed: 300,
      prescriptions: [
        { id: 1, name: 'Prescription 3', state: 'Approved' },
        { id: 2, name: 'Prescription 4', state: 'Pending' },
        // Add more prescriptions as needed
      ]
    }
  ];
  constructor(private route: ActivatedRoute) {}

  
  selectedPatient: any;
  ngOnInit(): void {
    console.log(this.route.params);
    this.route.params.subscribe(params => {
      const patientId = parseInt(params['patientId'], 10);
      console.log(patientId);
      if (!isNaN(patientId)) {
        this.fetchPrescriptions(patientId);
      }
    });
  }

  fetchPrescriptions(patientId: number): void {
    const patient = this.patients.find(p => p.id === patientId);
    console.log(patient);
    if (patient) {
      this.selectedPatient = patient;
      console.log(this.selectedPatient);
    }
  }
  
}
