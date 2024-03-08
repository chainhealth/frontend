import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: string = '';


  login() {
    // Check if the username and password are correct
    if (this.username === 'patient' && this.password === 'password') {
      // If correct, navigate to dashboard
      console.log('Logging in with username:', this.username, 'and password:', this.password);
    } else {
      // If incorrect, display appropriate error message
      if (this.username !== 'patient') {
        this.loginError = 'Wrong username';
      } else {
        this.loginError = 'Wrong password';
      }
    }
  }

}
