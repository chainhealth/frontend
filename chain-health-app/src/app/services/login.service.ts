// // src/app/services/login.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoginService {
//   private apiUrl = 'http://localhost:3000/api/login'; // Replace with your actual API endpoint

//   constructor(private http: HttpClient) { }

//   login(username: string, password: string): Observable<any> {
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//     const body = { username, password };

//     return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
//       map(response => response)
//     );
//   }
// }
