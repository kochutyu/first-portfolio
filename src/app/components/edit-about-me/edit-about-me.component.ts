import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/shared/services/admin.service';
import { map, finalize } from 'rxjs/operators';
import { PortfolioImg } from 'src/app/shared/model/portfolio-img.modal';
import { AboutService } from 'src/app/shared/services/about.service';

@Component({
  selector: 'app-edit-about-me',
  templateUrl: './edit-about-me.component.html',
  styleUrls: ['./edit-about-me.component.css']
})
export class EditAboutMeComponent implements OnInit {
  @ViewChild('fileWork', { static: false }) fileWork: ElementRef

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  urlImage: string;
  productImage: string;

  constructor(
    public AdminService: AdminService,
    public AboutService: AboutService,
    public prStorage: AngularFireStorage
  ) { }

  ngOnInit() {
  }

  addImg(): void{
    this.upload();
    this.AdminService.thisWorkImgs = this.AdminService.slider_img;
  }

  public upload(): void {
    if (this.fileWork.nativeElement.files[0]) {
      this.AdminService.upload = true;
      const id = Math.random().toString(36).substring(2)
      this.ref = this.prStorage.ref(`portfolio/${id}`)
      this.task = this.ref.put(this.fileWork.nativeElement.files[0])
      this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
      this.uploadProgress = this.task.percentageChanges();
      this.task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = this.ref.getDownloadURL()
          this.downloadURL.subscribe(url => {
            this.AdminService.urlImg = url;
            const slide = new PortfolioImg(this.AdminService.urlImg, null, null);
            
            
            this.AdminService.slider_img.push(slide);

            

            // if(this.AdminService.addWorkStatus) this.AdminService.thisWorkImgs.push(slide);

            

            this.AdminService.clearForm();
            this.AdminService.upload = false;
            this.AboutService.checkFirstElement = true;
          }
          )
        })
      ).subscribe();
      // this.AdminService.addShowSlider();
      
    }

  }

}
