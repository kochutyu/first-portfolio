import { Component, OnInit } from '@angular/core';

import { trigger, transition, useAnimation } from '@angular/animations';
import { bounce, fadeInLeft } from 'ng-animate';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(bounce))]),
    trigger('fadeInLeft', [transition('* => *', useAnimation(fadeInLeft))]),
  ],
})
export class BlogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
