import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin.service';
import { FireService } from 'src/app/shared/services/fire.service';



@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})


export class SliderComponent implements OnInit {
  images: any[];
  constructor(
    public AdminService: AdminService,
    public FireService: FireService
  ) {

  }

  ngOnInit() {
    this.images = this.AdminService.thisWorkImgs;
  }

}
