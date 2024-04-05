import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router: Router) { }

  login(username: string, password: string): void {
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
      // Handle invalid credentials
      console.log('Invalid credentials');
    }
  }
}
