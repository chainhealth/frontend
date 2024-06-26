import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  login(): void {
    this.apiService.login(this.username, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.accessToken);
        this.fetchHomePage(this.username);
        localStorage.setItem('username', this.username);

      },
      error: (error) => {
        this.errorMessage = error;
      }
    });
  }

  fetchHomePage(username: string): void {
    this.apiService.getHomePage().subscribe({
      next: (response) => {
        this.redirectUser(response.userType);
      },
      error: (error) => {
        this.errorMessage = error;
      }
    });
  }

  private redirectUser(role: string): void {
    if (role === 'MinistryofhealthMSP') {
      this.router.navigate(['/patient']);
    } else if (role === 'Doctor') {
      this.router.navigate(['/doctor']);
    } else if (role === 'Pharmacy') {
      this.router.navigate(['/pharmacy']);
    } else if (role === 'Insurance') {
      this.router.navigate(['/insurance']);
    } else {
      this.errorMessage = 'Invalid role';
    }
  }
}
