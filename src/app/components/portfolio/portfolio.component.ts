import { Component, OnInit, ElementRef, ViewChild, Renderer2, AfterViewInit, ViewChildren } from '@angular/core';
import { CloudService } from 'src/app/shared/services/cloud.service';
import { AdminService } from 'src/app/shared/services/admin.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FireService } from 'src/app/shared/services/fire.service';
import { IPortfolioWork } from 'src/app/shared/interfaces/portfolio-work.interface';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, AfterViewInit {
  // ARRAYS
  columns: any[] = []; // contents

  // TYPE_NUMBER
  height_block: number = 200; // first height fot show 2 rows contents
  count_Click_ShowMore: number = 0; // first click

  window_windth: number = 0;

  max_count_Click_ShowMore_Desctop: number = 0;
  max_count_Click_ShowMore_Tab: number = 0;
  max_count_Click_ShowMore_Mobile: number = 0;

  row: number = Math.ceil(this.columns.length / 3) + 1;// count rows of content

  // TYPE_STRING
  ShowMoreText: string = 'Show More ...'; // first value text

  // TYPE_BOOLEAN
  no_more_works: boolean = false;

  // GET_ELEMENTS
  @ViewChild('showMoreAnchor', { static: false }) showMoreAnchor: ElementRef; // btn SHOW MORE...
  @ViewChild('heightPortfolio', { static: false }) heightPortfolio: ElementRef; // height content

  constructor(
    private cloud: CloudService,
    private r: Renderer2,
    public AdminService: AdminService,
    private firestore: AngularFirestore,
    private lol: FireService,
    private FireService: FireService
  ) {
    // code
  }

  ngOnInit() {

    this.getColumns();
    this.firstWorks();
  }

  ngAfterViewInit(): void {

    setTimeout(() => { // emulate click btn SHOW MORE...
      this.showMoreAnchor.nativeElement.click();
    }, 2000);
  }

  OnShowMore(): void {

    this.window_windth = window.innerWidth; // width of device

    this.count_Click_ShowMore++; // + add 1 click SHOW MORE...

    if (this.window_windth > 1080) { // desktop
      this.deviceStatusText(this.max_count_Click_ShowMore_Mobile, 3, 205); // + 215px to height (3ps and + 1 row)

    } else if (this.window_windth > 780) { // tab
      this.deviceStatusText(this.max_count_Click_ShowMore_Mobile, 4, 410); // + 405px to height (4px and + 2 row)

    } else {  // mobile
      this.deviceStatusText(this.max_count_Click_ShowMore_Mobile, 3, 915); // + 615px to height (3px and + 3row)

    }

    this.galeryStyle();
    this.btnStatusText();
  }

  firstWorks(): void {
    window.addEventListener('resize', () => {
      this.window_windth = window.innerWidth;
      if (this.window_windth > 1080) { // desktop
        this.height_block = 205 * this.count_Click_ShowMore; // + 215px to height (1 row)

      } else if (this.window_windth > 780) { // tab
        this.height_block = 410 * this.count_Click_ShowMore; // + 405px to height (2 row)

      } else {  // mobile
        this.height_block = 915 * this.count_Click_ShowMore; // + 615px to height (3 row)

      }

      this.galeryStyle();
    });
  }

  getColumns(): void { // get contents from firebase
    this.FireService.getPortfolio('portfolio').subscribe(actionArray => {
      this.columns = actionArray.map(user => {
        return {
          ...user.payload.doc.data(),
          deleteID: user.payload.doc.id
        };
      });
      this.AdminService.portfolioPaginator = this.columns


    });
  }

  galeryStyle(): void {
    this.r.setStyle(this.heightPortfolio.nativeElement, 'maxHeight', `${this.height_block}px`);
    this.r.setStyle(this.heightPortfolio.nativeElement, 'transition', 'max-height 0.5s linear');
  }

  deviceStatusText(mac_count: number, works: number, height_block): void {
    mac_count = Math.ceil(this.columns.length / works);
    if (mac_count >= this.count_Click_ShowMore) this.height_block = height_block * this.count_Click_ShowMore;
    if (mac_count - this.count_Click_ShowMore === 0) this.no_more_works = true;
  }

  btnStatusText(): void {
    if (this.count_Click_ShowMore > 1) { // change text btn

      this.ShowMoreText = 'loading...';

      setTimeout(() => {
        if (this.no_more_works) this.ShowMoreText = 'No More Works';
        else {
          this.ShowMoreText = 'Show More...';
        }
      }, 1000);
    }
  }

  OnNewWork(): void {
    this.AdminService.open_modal();
    this.AdminService.newWork = true;
    this.AdminService.modal_slider_info = true;
    this.AdminService.addWorkStatus = true;
    this.AdminService.editPortfolio = false;
    this.AdminService.pPortfolio = true;
    this.AdminService.pAbout = false;

    this.AdminService.slider_img = [];
    this.AdminService.thisWorkImgs = [];

    this.AdminService.getID();
  }

  OnWorkEdit(work: IPortfolioWork): void {
    this.AdminService.open_modal();
    this.AdminService.newWork = true;
    this.AdminService.modal_slider_info = true;
    this.AdminService.editPortfolio = true;
    this.AdminService.editBtnCheck = true;
    this.AdminService.thisWork = work;
    this.AdminService.pPortfolio = true;
    this.AdminService.pAbout = false;


    this.AdminService.editObj = this.AdminService.portfolioPaginator.filter(item => item.id === work.id);
    this.AdminService.viewDemo = this.AdminService.editObj[0].showDemo;
    this.AdminService.slider_img = [];
    this.AdminService.thisWorkImgs = [];
    this.AdminService.editObj[0].slider.forEach(item => this.AdminService.thisWorkImgs.push(item));
    this.AdminService.slider_img = this.AdminService.thisWorkImgs;

    this.FireService.work(work);
  }

  OnDelete(work: IPortfolioWork): void {
    this.FireService.deleteDoc(work, 'portfolio');
  }

  OnWorkOpen(item): void {
    this.AdminService.open_modal();
    this.AdminService.workOpen = true;

    this.AdminService.slider_img = [];
    this.AdminService.thisWorkImgs = [];

    this.AdminService.work.unshift(item);
    this.AdminService.thisWork = item;

    this.AdminService.getWork();

    this.AdminService.modal_slider_info = true;

  }

}
