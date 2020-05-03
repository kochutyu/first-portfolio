import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin.service';
import { IPortfolioWork } from 'src/app/shared/interfaces/portfolio-work.interface';

@Component({
  selector: 'app-work-open',
  templateUrl: './work-open.component.html',
  styleUrls: ['./work-open.component.css']
})
export class WorkOpenComponent implements OnInit {
  work: any[] = [];
  constructor(
    public AdminService: AdminService
  ) { 
  }
  
  ngOnInit() {
    this.work = this.AdminService.work;
  }

  lol(): void{
    
  }
}
