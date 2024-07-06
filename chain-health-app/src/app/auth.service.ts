import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // A BehaviorSubject to keep track of the login status
  private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));

  // Observable to expose the login status
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  // Method to handle login logic
  login(token: string, username: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    this.loggedIn.next(true);
  }

  // Method to handle logout logic
  logout(): void {
    // localStorage.removeItem('token');
    // localStorage.removeItem('username');
    // localStorage.removeItem('role');
    localStorage.clear();
    this.loggedIn.next(false);
  }
}
