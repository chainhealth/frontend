import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsuranceComponent } from './insurance/insurance.component';
import { InsuranceClaimsComponent } from './insurance/insurance-claims/insurance-claims.component';
import { PatientComponent } from './patient/patient.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { DoctorComponent } from './doctor/doctor.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'patient', component: PatientComponent, canActivate: [AuthGuard] },
  { path: 'doctor', component: DoctorComponent, canActivate: [AuthGuard] },
  { path: 'pharmacy', component: PharmacyComponent, canActivate: [AuthGuard] },
  { path: 'insurance', component: InsuranceComponent, canActivate: [AuthGuard] },
  { path: 'insurance-claims/:patientId', component: InsuranceClaimsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
