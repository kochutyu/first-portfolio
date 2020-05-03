import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin.service';
import { FireService } from 'src/app/shared/services/fire.service';
import { AboutService } from 'src/app/shared/services/about.service';

@Component({
  selector: 'app-close-add-work-modal',
  templateUrl: './close-add-work-modal.component.html',
  styleUrls: ['./close-add-work-modal.component.css']
})
export class CloseAddWorkModalComponent implements OnInit {
  // @ViewChild('closeModal', {static: false}) closeModal:ElementRef;
  @ViewChild('closeModal', { static: false }) closeModal: ElementRef; // get navbar
  constructor(
    public AdminService: AdminService,
    public FireService: FireService,
    public AboutService: AboutService
  ) { }

  ngOnInit() {
  }

}
