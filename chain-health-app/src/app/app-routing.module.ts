import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsuranceComponent } from './insurance/insurance.component';
import { InsuranceClaimsComponent } from './insurance/insurance-claims/insurance-claims.component';
const routes: Routes = [
  {
    path: 'insurance-claims/:patientId',
    component: InsuranceClaimsComponent
  },
  { path: '', component: InsuranceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
