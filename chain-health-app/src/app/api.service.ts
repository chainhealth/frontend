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
    getPrescription(patientUsername: string, prescriptionId: string): Observable<any> {
    const url = `${this.apiUrl}/prescription`;
    return this.http.post(url, { patientUsername, prescriptionId }, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }
  
  getPrescriptions(patientId: string): Observable<any> {
    const url = `${this.apiUrl}/insuranceClaims`;
    const params = new HttpParams().set('patientId', patientId);
    return this.http.get(url, {
      headers: this.getHeaders(),
      params: params
    }).pipe(
      catchError(this.handleError)
    );
  }
  
  getInsuranceClaims(patientId: string): Observable<any> {
    const url = `${this.apiUrl}/insuranceClaims?patientId=${patientId}`;
    return this.http.get(url, { headers: this.getHeaders() })
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
  
  // confirmPrescriptionPharmacy(username: string, patientId: string, prescriptionId: string): Observable<any> {
  //   const url = `${this.apiUrl}/confirmPrescriptionPharmacy`;
  //   return this.http.post(url, { username, patientId, prescriptionId }, { headers: this.getHeaders() })
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }

  confirmPrescriptionPharmacy(patientId: string, prescriptionId: string): Observable<any> {
    const url = `${this.apiUrl}/confirmPrescriptionPharmacy`;
    return this.http.post(url, { patientId, prescriptionId }, { headers: this.getHeaders() });
  }
  
  confirmPrescriptionPatient(prescriptionId: string): Observable<any> {
    const url = `${this.apiUrl}/confirmPrescriptionPatient`;
    return this.http.post(url, { prescriptionId }, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  // writePrescription(patientId: string, prescription: any): Observable<any> {
  //   const url = `${this.apiUrl}/writePrescription`;
  //   const body = { patientId, prescription };
  //   return this.http.post(url, body, { headers: this.getHeaders() })
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }
  
  writePrescription(patientId: string, prescriptionData: any): Observable<any> {
    const url = `${this.apiUrl}/writePrescription`;
    console.log(patientId, prescriptionData);
    return this.http.post(url, { patientId, prescription: prescriptionData }, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        console.error('Error submitting prescription:', error);
        return throwError('Error submitting prescription.');
      })
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