import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { PatientComponent } from './patient/patient.component';
import { PatientDetailsComponent } from './patient/patient-details/patient-details.component';
import { SearchComponent } from './shared/search/search.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorReportComponent } from './doctor/doctor-report/doctor-report.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PatientComponent,
    PatientDetailsComponent,
    SearchComponent,
    LoadingComponent,
    DoctorComponent,
    DoctorReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
