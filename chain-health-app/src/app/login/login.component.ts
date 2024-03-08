import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';


  login() {
    // Here you can implement the login logic
    console.log('Logging in with username:', this.username, 'and password:', this.password);
  }

}
