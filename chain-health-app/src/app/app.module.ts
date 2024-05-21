import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { PatientComponent } from './patient/patient.component';
import { PatientDetailsComponent } from './shared/patient-details/patient-details.component';
import { SearchComponent } from './shared/search/search.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorReportComponent } from './doctor/doctor-report/doctor-report.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { GeneralNavbarComponent } from './shared/general-navbar/general-navbar.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { PatientInsuranceDetailsComponent } from './insurance/patient-insurance-details/patient-insurance-details.component';
import { InsuranceClaimsComponent } from './insurance/insurance-claims/insurance-claims.component';
import { HeroComponent } from './hero/hero.component';
import { FooterComponent } from './footer/footer.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { PrescriptionsComponent } from './prescriptions/prescriptions.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PatientComponent,
    PatientDetailsComponent,
    SearchComponent,
    LoadingComponent,
    DoctorComponent,
    DoctorReportComponent,
    AboutComponent,
    HomeComponent,
    GeneralNavbarComponent,
    PharmacyComponent,
    InsuranceComponent,
    PatientInsuranceDetailsComponent,
    InsuranceClaimsComponent,
    HeroComponent,
    FooterComponent,
    PrescriptionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
