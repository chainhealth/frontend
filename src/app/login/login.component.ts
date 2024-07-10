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
  
  // here if login is successful no need to return the flag to false because 
  // that happens as soon the redirection happens, this is due to the fact that each page
  // start with isLoading=false 
  isLoading: boolean = false; // Flag to indicate loading state


  constructor(
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService) {}

  login(): void {
    this.isLoading = true;

    this.apiService.login(this.username, this.password).subscribe({
      next: (response) => {
        const token = response.accessToken;
        this.authService.login(token, this.username);
        this.fetchUserRole();
      },
      error: (error) => {
        this.errorMessage = "Invalid username or password";
        this.isLoading = false;
      }
    });
  }

  fetchUserRole(): void {
    this.apiService.getHomePage().subscribe({
      next: (response) => {
        const role = response.userType;
        // console.log('Role received:', role);
        this.authService.setUserRole(role);
        this.redirectUser(role);
      },
      error: (error) => {
        this.errorMessage = error;
        this.isLoading = false;
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
