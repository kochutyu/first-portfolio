import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';

import { trigger, transition, useAnimation } from '@angular/animations';
import { bounce, fadeInLeft } from 'ng-animate';
import { WindowService } from 'src/app/shared/services/window.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(bounce))]),
    trigger('fadeInLeft', [transition('* => *', useAnimation(fadeInLeft))]),
  ],
})
export class HomeComponent implements OnInit {
  bounce: any;
  fadeInLeft: any;
  @ViewChild('home', { static: false }) home: ElementRef;
  @ViewChild('portfolio', { static: false }) portfolio: ElementRef;
  @ViewChild('about', { static: false }) about: ElementRef;
  @ViewChild('ontact', { static: false }) ontact: ElementRef;
  constructor(
    private windowS: WindowService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  @HostListener('window:scroll', ['$event']) onScroll(event) {
    const homeTop: number = this.portfolio.nativeElement.getBoundingClientRect().top;
    const portfolioTop: number = this.portfolio.nativeElement.getBoundingClientRect().top;
    const aboutTop: number = this.about.nativeElement.getBoundingClientRect().top;
    const contactTop: number = this.ontact.nativeElement.getBoundingClientRect().top;
    this.windowS.scroll = window.pageYOffset;
    console.log('portfolioTop: ', portfolioTop);
    if (portfolioTop >= 300) { 
      this.router.navigate(['/home']);
    }
    if (portfolioTop<0) {
      this.router.navigate(['/portfolio']);
    } 

    if (aboutTop < 0) {
      this.router.navigate(['/about']);
    } 

    if (contactTop < 0) {
      this.router.navigate(['/contact']);
    }

  }

}
