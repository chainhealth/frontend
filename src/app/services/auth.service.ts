/**
 * AuthService
 * 
 * This service manages user authentication and role-based access in the application. It uses 
 * BehaviorSubjects to manage the state of user login status and user role, ensuring that components 
 * can reactively respond to authentication changes.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GeneralNavbarComponent } from '../shared/general-navbar/general-navbar.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubjects to hold the login status and userRole initialized in localStorage
  // A BehaviorSubject in RxJS acts like a reactive variable that not only holds a current
  // value but also notifies all subscribers immediately whenever its value changes.
  private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  private userRole = new BehaviorSubject<string | null>(localStorage.getItem('role'));
  role$ = this.userRole.asObservable();
  private roleSubject = new BehaviorSubject<string>(localStorage.getItem('role') || '');

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get role() {
    return this.userRole.asObservable();
  }
  setRole(role: string): void {
    localStorage.setItem('role', role);
    this.roleSubject.next(role);
  }

  getRole(): string {
    return this.roleSubject.value;
  }

  clearRole(): void {
    localStorage.removeItem('role');
    this.roleSubject.next('guest');
  }

  login(token: string, username: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    this.loggedIn.next(true);
    // this.userRoleService.getRole(localStorage.getItem('role'));
  }

  setUserRole(role: string): void {
    localStorage.setItem('role', role);
    this.userRole.next(role);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    this.loggedIn.next(false);
    this.userRole.next(null);
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }
}
