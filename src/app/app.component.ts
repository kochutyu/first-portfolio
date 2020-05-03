import { Component, ViewEncapsulation, OnInit, ElementRef, ViewChild, Renderer2, HostListener } from '@angular/core';
import * as AOS from '../../node_modules/aos';
import { AdminService } from './shared/services/admin.service';
import { FireService } from './shared/services/fire.service';
import { ToastrService } from 'ngx-toastr';
import { WindowService } from './shared/services/window.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  users: any[] = [];
  title = 'app';

  @ViewChild('ContentWidth', { static: false }) ContentWidth: ElementRef; // get navbar

  constructor(
    public r: Renderer2,
    public AdminService: AdminService,
    public FireService: FireService,
    public toast: ToastrService,
    private windowS: WindowService
  ) {

  }
  test() {
    this.toast.success("I'm a toast!", "Success!");
  }

  ngOnInit() {
    AOS.init({
      offset: 200,
      duration: 700,
      easing: 'linear'
    });
    this.windowS.width = window.innerWidth
    this.windowS.height = window.innerHeight;
  }

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.windowS.width = event.target.innerWidth
    this.windowS.height = event.target.innerHeight;
  }

}