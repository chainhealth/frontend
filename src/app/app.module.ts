import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { PatientComponent } from './patient/patient.component';
import { SearchComponent } from './shared/search/search.component';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorReportComponent } from './doctor/doctor-report/doctor-report.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { GeneralNavbarComponent } from './shared/general-navbar/general-navbar.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { InsuranceClaimsComponent } from './insurance/insurance-claims/insurance-claims.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PrescriptionsComponent } from './shared/prescriptions/prescriptions.component';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PatientComponent,
    SearchComponent,
    DoctorComponent,
    DoctorReportComponent,
    AboutComponent,
    HomeComponent,
    GeneralNavbarComponent,
    PharmacyComponent,
    InsuranceComponent,
    InsuranceClaimsComponent,
    PrescriptionsComponent,
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
    MatProgressSpinnerModule,
    HttpClientModule,
  ],

  /** multi: true: This tells Angular to allow multiple interceptors to be registered
   *  under the same token (HTTP_INTERCEPTORS). If you set multi: false (or omit it),
   *  Angular will replace any existing provider for that token with the new one.
   *  By using multi: true, you can have multiple interceptors in your application,
   *  which will all be applied in the order they are provided. */
  providers: [
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
