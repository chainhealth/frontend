import { Component, OnInit } from '@angular/core';

declare const GLightbox: any;
declare const Swiper: any;
declare const PureCounter: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.initiateScripts();
  }

  private initiateScripts(): void {
    (function () {
      "use strict";

      // Copy your JavaScript code here and adjust as needed
      // For example:
      const glightbox = GLightbox({
        selector: '.glightbox'
      });

      const testimonialsSlider = new Swiper('.testimonials-slider', {
        speed: 600,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          1200: {
            slidesPerView: 2,
            spaceBetween: 20
          }
        }
      });

      const pureCounter = new PureCounter();

    })();
  }
}