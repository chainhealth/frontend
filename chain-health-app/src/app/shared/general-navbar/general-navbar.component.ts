import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-general-navbar',
  templateUrl: './general-navbar.component.html',
  styleUrls: ['./general-navbar.component.scss']
})
export class GeneralNavbarComponent {
  isLoggedIn: boolean = false;
  isTransparent: boolean = true;
  isMobile: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    // Subscribe to the login status observable
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  // Debounce function to limit frequency of updates during resizing
  private debounce(func: Function, wait: number) {
    let timeout: any;
    return function (this: any) { // Explicitly annotate 'this' as 'any'
      const context = this;
      const args = arguments;
      const later = function () {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  isMenuOpen: boolean = false;
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
