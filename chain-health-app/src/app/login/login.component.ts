import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = ''; // Property to bind with username input
  password: string = ''; // Property to bind with password input
  errorMessage: string = ''; // Property to hold error message

  constructor(private router: Router, private http: HttpClient) { }

  login(): void {
    // Retrieve username and password from properties
    const { username, password } = this;

    // Reset error message
    this.errorMessage = '';

    // Send login request to the server
    this.http.post<any>('http://localhost:3000/login', { username, password })
      .subscribe(
        response => {
          console.log(response);
          // Handle successful login
          if (response) {
            switch (response.userType) {
              case 'MinistryofhealthMSP':
                this.router.navigate(['/patient']);
                break;
              case 'Doctor':
                this.router.navigate(['/doctor']);
                break;
              case 'Pharmacy':
                this.router.navigate(['/pharmacy']);
                break;
              case 'Insurance':
                this.router.navigate(['/insurance']);
                break;
              default:
                this.errorMessage = 'Wrong username or password';
                console.log('Invalid credentials');
                break;
            }
          } 
        },
        error => {
          // Handle error response
          console.error('Error:', error);
          this.errorMessage = 'An error occurred. Please try again later.';
        }
      );
  }
}
