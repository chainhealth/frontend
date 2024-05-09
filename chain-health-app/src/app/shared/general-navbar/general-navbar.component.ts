import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-general-navbar',
  templateUrl: './general-navbar.component.html',
  styleUrls: ['./general-navbar.component.scss']
})
export class GeneralNavbarComponent {
  isLoggedIn: boolean = false; // Initially, the user is not logged in
  isTransparent: boolean = true;
  isMobile: boolean = false;

  constructor(private router: Router) {
    // You can add logic here to check if the user is logged in
    // and set the value of isLoggedIn accordingly
    // For demonstration purposes, I'll assume the user is logged in
    
    this.isLoggedIn = true;
    // this.onWindowChange(); // Initialize properties on component initialization
  }

  // @HostListener('window:scroll', [])
  // @HostListener('window:resize', [])
  // onWindowChange() {
  //   // Using debounce to avoid too many updates while resizing
  //   this.debounce(() => {
  //     const yOffset = window.pageYOffset;
  //     const screenWidth = window.innerWidth;

  //     // Update transparency based on scroll position
  //     this.isTransparent = yOffset < 600;

  //     // Update mobile status based on screen width
  //     this.isMobile = screenWidth <= 768;
  //   }, 50)();
  // }

  logout(): void {
    // Add logic here to handle logout
    // For example, you can clear user authentication tokens or session
    // and redirect the user to the login page
    this.isLoggedIn = false;
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
