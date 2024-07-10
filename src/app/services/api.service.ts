/* 
  using arrow functions to handle errors is mandatory here it doesnt work without them as the keyword
  'this' means another thing in that context
*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  private apiUrl = 'http://localhost:3000';
  isLoggedIn: boolean | undefined;
  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
    // Subscribe to the login status observable
    this.authService.isLoggedIn.subscribe((loggedIn) => {
    this.isLoggedIn = loggedIn;
    });
  }

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }
  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login`;
    return this.http.post(url, { username, password }).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  getHomePage(): Observable<any> {
    const url = `${this.apiUrl}/homePage`;
    return this.http.get(url, { headers: this.getHeaders() }).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  getPrescription(patientUsername: string, prescriptionId: string): Observable<any> {
    const url = `${this.apiUrl}/prescription`;
    return this.http.post(url, { patientUsername, prescriptionId }, { headers: this.getHeaders() }).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  getPrescriptions(patientId: string): Observable<any> {
    const url = `${this.apiUrl}/insuranceClaims`;
    const params = new HttpParams().set('patientId', patientId);
    return this.http.get(url, { headers: this.getHeaders(), params }).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  getInsuranceClaims(patientId: string): Observable<any> {
    const url = `${this.apiUrl}/insuranceClaims`;
    const params = new HttpParams().set('patientId', patientId);
    return this.http.get(url, { headers: this.getHeaders(), params }).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  searchPatient(patientId: string): Observable<any> {
    const url = `${this.apiUrl}/searchPatient`;
    const params = new HttpParams().set('patientId', patientId);
    return this.http.get(url, { headers: this.getHeaders(), params }).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  confirmPrescriptionPharmacy(patientId: string, prescriptionId: string): Observable<any> {
    const url = `${this.apiUrl}/confirmPrescriptionPharmacy`;
    return this.http.post(url, { patientId, prescriptionId }, { headers: this.getHeaders() }).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  confirmPrescriptionPatient(prescriptionId: string): Observable<any> {
    const url = `${this.apiUrl}/confirmPrescriptionPatient`;
    return this.http.post(url, { prescriptionId }, { headers: this.getHeaders() }).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  writePrescription(patientId: string, prescriptionData: any): Observable<any> {
    const url = `${this.apiUrl}/writePrescription`;
    return this.http.post(url, { patientId, prescription: prescriptionData }, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        console.error('Error submitting prescription:', error);
        return throwError('Error submitting prescription.');
      })
    );
  }


  private handleError(error: any) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // Server-side error
      console.log(error.status);
      switch (error.status) {
        case 400:
          errorMessage = 'Bad request error.';
          break;
        case 401:
          errorMessage = 'Session expired. Please log in again.';
          window.alert(errorMessage);
          // logout user
          this.authService.logout();
          this.router.navigate(['/']);
          break;
        case 403:
          errorMessage = 'Access denied.';
          window.alert(errorMessage);
          break;
        case 404:
          errorMessage = 'Not found.';
          window.alert(errorMessage);
          break;
        default:
          errorMessage = `Server error: ${error.status}.`;
          window.alert(errorMessage);
          break;
      }
    }

    // return a user-facing error message
    return throwError(errorMessage);
  }
}
