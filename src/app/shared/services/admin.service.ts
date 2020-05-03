import { Injectable, OnInit } from '@angular/core';
import { INavbar } from '../interfaces/navbar.interface';
import { PortfolioImg } from '../model/portfolio-img.modal';
import { IPortfolioWork } from '../interfaces/portfolio-work.interface';
import { AboutService } from './about.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService implements INavbar, OnInit {
  id: number;

  // pages
  pPortfolio: boolean = false;
  pAbout: boolean = true;
  pContact: boolean = true;
  pBlog: boolean = true;

  dataTitle: string;
  href: string;
  fIcon: string;
  url: string = '3';

  editPortfolio: boolean;
  editObj: IPortfolioWork[] = [];

  addWorkStatus: boolean = false;



  //portfolio
  work: any[] = [];
  viewDemo: string;
  thisWork: IPortfolioWork;
  thisWorkImgs: any[] = [];
  editBtnCheck: boolean = false;
  editBtnCheckCount: number = 0;

  // portfolio paginator
  portfolioPaginator: any[] = [];
  paginatorIndex: number[] = [];
  paginatorCount: number = 0;

  // slider
  slider_img: PortfolioImg[] = [];
  urlImg: string;
  header: string;
  describe: string;

  // admin
  signIn: boolean = false;

  // modal ↓
  modal: boolean = false;
  newWork: boolean = false;
  workOpen: boolean = false;
  modal_slider_info: boolean = false;
  editAbout: boolean = false;
  add_skill: boolean = false;
  upload: boolean = false;
  portfolioID: number = 0;
  IDs: number[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  getID(): number {
    if (this.portfolioPaginator.length === 0) {
      this.IDs.unshift(0);
    } else {
      this.portfolioPaginator.forEach(item => { this.IDs.unshift(item.id) });
      this.IDs.sort((a, b) => b - a);
    }
    return this.IDs[0]
  }

  AddSliderCount: number = 0;
  addShowSlider(): void {
    let id = this.getID();
    let i = this.AddSliderCount;
    // const sliderArr: any[] = this.portfolioPaginator.filter( item => item.id === id );
    // const slider = sliderArr[i].slider[0];
    const slide = { urlImg: this.urlImg, describe: this.describe, header: this.header };
    this.thisWorkImgs.push(slide);

    this.AddSliderCount++;
  }

  editWork(): void {
    let work = this.getID;
    
  }

  open_modal(): void {
    this.modal = true;
  }

  close_modal(): void {
    this.modal = false;

    // components of modal ↓
    this.newWork = false;
    this.workOpen = false;
    this.editAbout = false;
    this.modal_slider_info = false;
    this.add_skill = false;
    this.editPortfolio = false;
    this.upload = false;
    this.editBtnCheck = false;
    this.addWorkStatus = false;
    this.pPortfolio = false;
    this.pAbout = false;
    this.pContact = false;
    this.pBlog = false;
    this.thisWorkImgs = [];
    this.paginatorIndex = [];
    this.slider_img = [];
    this.paginatorCount = 0;
    this.editBtnCheckCount = 0;
    this.clearForm();
    

  }

  getWork(): void {
    this.thisWork.slider.forEach(item => {
      this.thisWorkImgs.push(item);
      
    })
  }

  clearForm(): void {
    this.urlImg = this.header = this.describe = '';
  }

}
