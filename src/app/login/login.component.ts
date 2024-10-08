/**
 * Login Component
 * 
 * Gets username and password from user and sends an api request to query the user.
 * If the user exists the login method from the auth.service is called to handle logging in.
 * A token and role are recieved and placed in the localstorage then the user is redirect to
 * the corresponding page ie /patient or /pharmacy or /insurance or /doctor based on the role.
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

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
