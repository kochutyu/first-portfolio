import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  Date: Date = new Date();
  logo: Observable<any[]>;
  constructor(private firestore: AngularFirestore) { 
    this.logo = this.firestore.collection('footer').snapshotChanges();
   }

  ngOnInit() {
  }

}
