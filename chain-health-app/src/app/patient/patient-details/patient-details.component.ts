import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.scss'
})
export class PatientDetailsComponent {
  @Input() balance: number = 0; // input decorator allows flow from parent component
  @Input() patientPrescriptions: any[] = []; // Assuming prescriptions is an array of objects
  @Output() purchaseEvent: EventEmitter<any> = new EventEmitter<any>();

  purchasePrescription(prescription: any) {
    this.purchaseEvent.emit(prescription);
  }

  
}
