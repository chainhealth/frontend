import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login`;
    return this.http.post(url, { username, password }).pipe(
      catchError(this.handleError)
    );
  }

  getHomePage(): Observable<any> {
    const url = `${this.apiUrl}/homePage`;
    
    return this.http.get(url, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }
  
  // getPrescription(username: string, patientUsername: string, prescriptionId: string): Observable<any> {
  //   const url = `${this.apiUrl}/prescription`;
  //   return this.http.post(url, { username, patientUsername, prescriptionId }, { headers: this.getHeaders() })
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }
  // getPrescription(username: string, patientUsername: string, prescriptionId: string): Observable<any> {
  //   const url = `${this.apiUrl}/prescription`;
  //   return this.http.post(url, { username, patientUsername, prescriptionId }, { headers: this.getHeaders() })
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }
  getPrescription(patientUsername: string, prescriptionId: string): Observable<any> {
    const url = `${this.apiUrl}/prescription`;
    return this.http.post(url, { patientUsername, prescriptionId }, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }
  
  

  searchPatient(patientId: string): Observable<any> {
    const url = `${this.apiUrl}/searchPatient?patientId=${patientId}`;
    return this.http.get(url, { headers: this.getHeaders() }) // GET with query parameters
      .pipe(
        catchError(this.handleError)
      );
  }  
  
  confirmPrescriptionPharmacy(username: string, patientId: string, prescriptionId: string): Observable<any> {
    const url = `${this.apiUrl}/confirmPrescriptionPharmacy`;
    return this.http.post(url, { username, patientId, prescriptionId }, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  confirmPrescriptionPatient(username: string, prescriptionId: string): Observable<any> {
    const url = `${this.apiUrl}/confirmPrescriptionPatient`;
    return this.http.post(url, { username, prescriptionId }, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  writePrescription(username: string, patientId: string, prescription: any): Observable<any> {
    const url = `${this.apiUrl}/writePrescription`;
    return this.http.post(url, { username, patientId, prescription }, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}