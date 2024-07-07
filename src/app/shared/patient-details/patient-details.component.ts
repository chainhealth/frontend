import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent {
  @Input() balance: number = 0;
  @Input() patientPrescriptions: any[] = [];
  @Input() isPharmacyView: boolean = false; // New input to determine if the component is being used in the pharmacy context
  @Output() purchaseEvent: EventEmitter<any> = new EventEmitter<any>();

  purchaseOrSell(prescription: any) {
    if (this.isPharmacyView) {
      // Emit the prescription to be sold
      this.purchaseEvent.emit(prescription);
    } else {
      // Emit the prescription to be purchased
      this.purchaseEvent.emit(prescription);
    }
  }
}
