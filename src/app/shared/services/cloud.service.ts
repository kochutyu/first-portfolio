import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { INavbar } from '../interfaces/navbar.interface';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class CloudService {
  navbar: Observable<any[]>;
  constructor(
    private firestore: AngularFirestore,
    private AdminService: AdminService,
    private db: AngularFirestore
  ) 
  { }

  getAdminNavbar(): Observable<any[]>{
    return this.db.collection('admin-Navbar').valueChanges();
  }

  getUserNavbar(): Observable<any[]>{
    return this.db.collection('user-Navbar').valueChanges();
  }
  
  getPortfolioWorks(): any {
    return this.firestore.collection('lolllll').snapshotChanges();
  }
}
