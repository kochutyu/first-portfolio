import { Component, OnInit } from '@angular/core';
import { AdminService } from '../shared/services/admin.service';
import { CloudService } from '../shared/services/cloud.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  signIn: boolean;
  adminLogin: string;
  adminPassword: string;
  constructor(
    private AdminService: AdminService,
    private CloudService: CloudService
  ) {
    this.signIn = this.AdminService.signIn;
  }

  ngOnInit() {
  }

  goToAdmin(): void {
    if (this.adminLogin === 'admin' && this.adminPassword === 'admin') {
      this.AdminService.signIn = true;
      this.signIn = this.AdminService.signIn;
    }
  }

}
