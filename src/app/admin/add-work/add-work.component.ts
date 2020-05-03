import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from "rxjs/operators";
import { AdminService } from 'src/app/shared/services/admin.service';
import { PortfolioImg } from 'src/app/shared/model/portfolio-img.modal';

@Component({
  selector: 'app-add-work',
  templateUrl: './add-work.component.html',
  styleUrls: ['./add-work.component.css']
})
export class AddWorkComponent implements OnInit {
  @ViewChild('fileWork', { static: false }) fileWork: ElementRef

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  urlImage: string;
  productImage: string;

  constructor(
    public store: AngularFireStorage,
    public prStorage: AngularFireStorage,
    public AdminService: AdminService
  ) { }

  ngOnInit() {
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
            const slide = new PortfolioImg(this.AdminService.urlImg, this.AdminService.describe, this.AdminService.header);
            
            
            this.AdminService.slider_img.push(slide);

            

            if(this.AdminService.addWorkStatus) this.AdminService.thisWorkImgs.push(slide);

            

            this.AdminService.clearForm();
            this.AdminService.upload = false;
          }
          )
        })
      ).subscribe();
      // this.AdminService.addShowSlider();
      
    }

  }
}
