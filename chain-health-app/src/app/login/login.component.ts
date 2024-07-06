import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private apiService: ApiService, private router: Router, private authService: AuthService) {}

  login(): void {
    this.apiService.login(this.username, this.password).subscribe({
      next: (response) => {
        const token = response.accessToken;
        this.authService.login(token, this.username);
        this.fetchUserRole();
      },
      error: (error) => {
        this.errorMessage = error;
      }
    });
  }

  fetchUserRole(): void {
    this.apiService.getHomePage().subscribe({
      next: (response) => {
        const role = response.userType;
        console.log('Role received:', role);
        this.authService.setUserRole(role);
        this.redirectUser(role);
      },
      error: (error) => {
        this.errorMessage = error;
      }
    });
  }
  private redirectUser(role: string): void {
    
    localStorage.setItem("role", role);

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
