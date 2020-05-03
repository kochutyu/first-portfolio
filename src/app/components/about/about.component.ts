import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin.service';
import { AboutService } from 'src/app/shared/services/about.service';
import { FireService } from 'src/app/shared/services/fire.service';
import { IAboutInfo } from 'src/app/shared/interfaces/about-info.interface';
import { IAboutSlill } from 'src/app/shared/interfaces/about-skill.interface';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  for: any[] = [1,2,3,4,5,6];
  items: any[] = [1,2];
  constructor(
    public AdminService: AdminService,
    public AboutService: AboutService,
    public FireService: FireService
  ) { }

  ngOnInit() {
    this.AboutService.getAboutInfo();
    this.AboutService.getAboutSkills();
  }
  aboutInfoArr: IAboutInfo[] = [];

  OnEditAbout(): void{
    this.AdminService.open_modal();
    this.AdminService.editAbout = true;

    this.AboutService.ngIfAboutInfo = true;
    this.AboutService.ngIfSkill = false;

    this.AdminService.pAbout = true;
    this.AdminService.pPortfolio = false;
    this.AboutService.checkExistFirstElement();
  }

  onAddSkill(): void{
    this.AdminService.open_modal();
    this.AdminService.add_skill = true;
    this.AboutService.editAboutSkill = false;

    this.AboutService.ngIfAboutInfo = false;
    this.AboutService.ngIfSkill = true;

    this.AdminService.pAbout = true;
    this.AdminService.pPortfolio = false;

    this.AboutService.addStatusSkill = true;

    this.AboutService.clearForm();

  }

  deleteSkill(skill: IAboutSlill): void{
    this.FireService.deleteDocID(skill, 'about-skills');
  }

  editSkill(skill: IAboutSlill): void{
    this.onAddSkill();
    this.AboutService.editAboutSkill = true;
    this.AboutService.addStatusSkill = false;

    this.AboutService.logo = skill.logo;
    this.AboutService.header = skill.header;
    this.AboutService.text = skill.text;

    this.AboutService.thisSkill[0] = skill;
    }

}
