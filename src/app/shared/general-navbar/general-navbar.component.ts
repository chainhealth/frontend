/**
 * General Navbar Component
 *
 * Component representing the general navigation bar of the application. This component
 * handles user authentication (to be able to either display login or logout), status,
 * navigation logic, and dynamic home route setting based on user roles.
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-general-navbar',
  templateUrl: './general-navbar.component.html',
  styleUrls: ['./general-navbar.component.scss']
})
export class GeneralNavbarComponent {
  isLoggedIn: boolean = false;
  homeRoute: string = '/';

  constructor(private router: Router, private authService: AuthService) {
    // Subscribe to the login status observable
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  ngOnInit() {
    // Subscribe to the role observable and set the home route
    this.authService.role$.subscribe((role) => {
      this.setHomeRoute(role || '');
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }


  isMenuOpen: boolean = false;
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  setHomeRoute(role: string) {
    if (role === 'MinistryofhealthMSP') {
      this.homeRoute = '/patient';
    } else if (role === 'Doctor') {
      this.homeRoute = '/doctor';
    } else if (role === 'Insurance') {
      this.homeRoute = '/insurance';
    } else if (role === 'Pharmacy') {
      this.homeRoute = '/pharmacy';
    } else {
      this.homeRoute = '/';
    }
  }
}
