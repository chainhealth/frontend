import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = ''; // Property to bind with username input
  password: string = ''; // Property to bind with password input
  errorMessage: string = ''; // Property to hold error message

  constructor(private router: Router) { }

  login(): void {
    // Retrieve username and password from properties
    const { username, password } = this;

    // Reset error message
    this.errorMessage = '';

    // Check username and password
    if (username === 'patient' && password === 'password') {
      this.router.navigate(['/patient']);
    } else if (username === 'doctor' && password === 'password') {
      this.router.navigate(['/doctor']);
    } else if (username === 'pharmacy' && password === 'password') {
      this.router.navigate(['/pharmacy']);
    } else if (username === 'insurance' && password === 'password') {
      this.router.navigate(['/insurance']);
    } else {
      // Set error message for invalid credentials
      this.errorMessage = 'Wrong username or password';
      console.log('Invalid credentials');
    }
  }
}
