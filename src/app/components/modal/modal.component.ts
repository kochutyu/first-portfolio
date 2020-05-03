import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  constructor(
    public AdminService: AdminService
  ) { }

  ngOnInit() {
    window.scrollTo(0,0);
  }
  

}
