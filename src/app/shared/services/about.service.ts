import { Injectable, OnInit } from '@angular/core';
import { AdminService } from './admin.service';
import { FireService } from './fire.service';
import { IAboutInfo } from '../interfaces/about-info.interface';
import { AboutInfo } from '../model/about-info.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastService } from './toast.service';
import { AboutSlill } from '../model/about-skill.model';
import { IAboutSlill } from '../interfaces/about-skill.interface';

@Injectable({
  providedIn: 'root'
})
export class AboutService implements OnInit {

  editAboutInfo: boolean = false;
  editAboutSkill: boolean = false;
  checkFirstElement: boolean = false;
  
  addStatusSkill: boolean = false;
  ngIfAboutInfo: boolean = false;
  ngIfSkill: boolean = false;

  aboutInfoArr: any[] = [];
  aboutSkillsArr: IAboutSlill[] = [];
  getSkillByID: IAboutSlill[] = [];
  thisSkill: IAboutSlill[] = [];

  addSkillID: string;

  // getSkillByID: IAboutInfo[] = [];

  logo: string;
  header: string;
  text: string;

  clearForm(): void {
    this.logo = '';
    this.header = '';
    this.text = '';
  }



  constructor(
    private AdminService: AdminService,
    private FireService: FireService,
    private firestore: AngularFirestore,
    private toastr: ToastService
  ) { }

  ngOnInit(): void {
    this.getAboutInfo();
  }

  aboutInfo(): void {
    if (!this.aboutInfoArr[0]) {
      let info = new AboutInfo(this.header, this.text, this.AdminService.slider_img);
      this.firestore.collection('about-info').add(JSON.parse(JSON.stringify(info)));
      this.toastr.success('New info', 'was add to server!')
    } else {
      this.AdminService.slider_img = this.aboutInfoArr[0].slider;
      this.FireService.deleteDocID(this.aboutInfoArr[0], 'about-info');

      let info = new AboutInfo(this.header, this.text, this.AdminService.slider_img);
      this.firestore.collection('about-info').add(JSON.parse(JSON.stringify(info)));
      this.toastr.success('This info', 'was saved on the server!')
    }
    this.getAboutInfo();
  }
  aboutSkill(): void {
    if (!this.editAboutSkill) { // add
      this.aboutSkillsArr.forEach(item => { this.getSkillByID.push(item) });
      let skill = new AboutSlill(this.logo, this.text, this.header);
      this.firestore.collection('about-skills').add(JSON.parse(JSON.stringify(skill)));
      this.toastr.success('New skill', 'was add to server!');
      
      this.editAboutSkill = true;
    } else {
      if (this.addStatusSkill) {
        let arrTarget = this.getSkillByID.map( item => JSON.stringify(item));
        this.thisSkill = this.aboutSkillsArr.map( item => JSON.stringify(item)).filter( item => !arrTarget.includes(item)).map( item => JSON.parse(item)); 
      }

      if (this.thisSkill[0]) { // checking for deleted item

        // DELETE this work
        this.FireService.deleteDocID(this.thisSkill[0], 'about-skills');

        // UPDATE your DATA by ID
        let skill = new AboutSlill(this.logo, this.text, this.header);
        this.firestore.collection('about-skills').add(JSON.parse(JSON.stringify(skill)));
        this.toastr.success('This skills', 'was saved on the server!')
      } else {
        this.editAboutSkill = false;
        this.toastr.error('This skills', 'was deleted!')
      }

    }
  }

  checkExistFirstElement(): void {
    if (!this.aboutInfoArr[0]) {
      this.editAboutInfo = false;
      this.checkFirstElement = false;
      this.header = '';
      this.text = '';
      this.AdminService.slider_img = [];
      this.AdminService.thisWorkImgs = [];
    } else {
      this.editAboutInfo = true;
      this.checkFirstElement = true;
      this.header = this.aboutInfoArr[0].header;
      this.text = this.aboutInfoArr[0].text;
      this.AdminService.slider_img = this.aboutInfoArr[0].slider;
      this.AdminService.thisWorkImgs = this.aboutInfoArr[0].slider;
    }
  }

  getAboutInfo(): void {
    this.FireService.getPortfolio('about-info').subscribe(actionArray => {
      this.aboutInfoArr = actionArray.map(user => {
        return {
          id: user.payload.doc.id,
          ...user.payload.doc.data()
        };
      });
      this.checkExistFirstElement();
    });
  }

  getAboutSkills(): void {
    this.FireService.getPortfolio('about-skills').subscribe(actionArray => {
      this.aboutSkillsArr = actionArray.map(user => {
        return {
          ...user.payload.doc.data(),
          id: user.payload.doc.id
        };
      });
      console.log(this.aboutSkillsArr);
    });
  }

}
