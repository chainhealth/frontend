import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
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
