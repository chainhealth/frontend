/**
 * AuthGuard Service
 * 
 * This service is used to protect routes from unauthorized access. It checks if the user is 
 * logged in and if the user has the required role to access the route. If the user is not 
 * logged in or does not have the required role, they are redirected to the home page.
 */

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate( next: ActivatedRouteSnapshot): boolean {
    // !! double negation to get a boolean value
    const isLoggedIn = !!localStorage.getItem('token');
    const userRole = this.authService.getUserRole();

    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }

    const requiredRole = next.data['role']; // Correctly accessing the 'role' property
    if (requiredRole && userRole !== requiredRole) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
