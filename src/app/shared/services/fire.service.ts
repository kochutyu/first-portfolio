import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AdminService } from './admin.service';
import { IPortfolioWork } from '../interfaces/portfolio-work.interface';
import { PortfolioWork } from '../model/portfolio-work.model';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  // sections
  public allWorks: any[] = [];

  constructor(
    private firestore: AngularFirestore,
    private AdminService: AdminService,
    private toast: ToastService
  ) { }

  // GET
  getArr(name: string): any {
    return this.firestore.collection(`${name}`).snapshotChanges();
  }

  work(editWork?: IPortfolioWork): void {
    let IDd = this.AdminService.getID() + 1;
    let editID = IDd - 1;
    if (!this.AdminService.editPortfolio) {

      // generate ID
      const work = new PortfolioWork(IDd, this.AdminService.viewDemo, this.AdminService.slider_img);

      // ADD new WORK by ID
      this.firestore.collection('portfolio').add(JSON.parse(JSON.stringify(work)));
      this.toast.success('New work', 'was add to server!')
      this.AdminService.editPortfolio = true;

      // SEARCH this WORK
      let obj: IPortfolioWork[] = this.AdminService.portfolioPaginator.filter(item => item.id === IDd);

      // copy DATA of new WORK
      this.AdminService.viewDemo = obj[0].showDemo;
      this.AdminService.slider_img = [];
      this.AdminService.thisWorkImgs = [];
      obj[0].slider.forEach(item => this.AdminService.thisWorkImgs.push(item));
      this.AdminService.slider_img = this.AdminService.thisWorkImgs;

    } else {

      if (!this.AdminService.editBtnCheck) {
        // SEARCH this WORK
        let obj: IPortfolioWork[] = this.AdminService.portfolioPaginator.filter(item => item.id === editID);

        if (obj[0]) { // checking for deleted item

          // DELETE this work
          this.deleteDoc(obj[0], 'portfolio');

          // UPDATE your DATA by ID
          const work = new PortfolioWork(editID, this.AdminService.viewDemo, this.AdminService.slider_img);
          this.firestore.collection('portfolio').add(JSON.parse(JSON.stringify(work)));
          this.toast.success('This work', 'was saved on the server!')
        } else {
          this.toast.error('This work', 'was deleted!')
        }

      } else {
        // alert()

        let count = this.AdminService.editBtnCheckCount;
        if (count === 0) {

          // GO to MODAL
          this.AdminService.editBtnCheckCount++;
        } else {

          // SEARCH this WORK
          this.AdminService.editObj = this.AdminService.portfolioPaginator.filter(item => item.id === this.AdminService.thisWork.id)

          if (this.AdminService.editObj[0]) { // checking for deleted item

            // DELETE this work
            this.deleteDoc(this.AdminService.editObj[0], 'portfolio');
            

            // UPDATE your DATA by ID
            const work = new PortfolioWork(this.AdminService.thisWork.id, this.AdminService.viewDemo, this.AdminService.slider_img);
            this.firestore.collection('portfolio').add(JSON.parse(JSON.stringify(work)));
            this.toast.success('This work', 'was saved on the server!')
          } else {
            this.toast.error('This work', 'was deleted!')
          }

        }
      }

    }
  }

  getPortfolio(collection: string): any {
    return this.firestore.collection(`${collection}`).snapshotChanges();
  }



  private testDoc: AngularFirestoreDocument<any>;

  deleteDoc(work: IPortfolioWork, collection: string) {
    this.firestore.doc(`${collection}/${work.deleteID}`).delete();
  }
  deleteDocID(work: any, collection: string) {
    this.firestore.doc(`${collection}/${work.id}`).delete();
  }

}
