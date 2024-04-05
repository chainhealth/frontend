import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    console.log('AuthGuard activated');
    // Check if user is logged in, implement your authentication logic here
    const isLoggedIn = /* Implement your logic here */ true;
    if (!isLoggedIn) {
      console.log('User not logged in. Redirecting to login page.');
      // If not logged in, redirect to login page
      this.router.navigate(['/login']);
      return false;
    }
    console.log('User logged in.');
    // Implement your authorization logic here if needed
    // For now, allow access to all routes
    return true;
  }
}
