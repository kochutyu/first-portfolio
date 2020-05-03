import { Component, OnInit } from '@angular/core';
import { AboutService } from 'src/app/shared/services/about.service';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.css']
})
export class AddSkillComponent implements OnInit {

  constructor(
    public AboutService: AboutService
  ) { }

  ngOnInit() {
  }

}
