
// 1. ANGULAR
// 2. FIREBASE
// 3. COMPONENTS
// 4. LIBRERYS

// ANGULAR
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// FIREBASE
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

// LIBRERYS
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule} from 'ngx-ui-loader';
import { ngxUiLoaderConfig } from './preloader-config';

// NG BOOTSTRAP
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

// COMPONENTS
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { BlogComponent } from './pages/blog/blog.component';
import { AdminComponent } from './admin/admin.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { SocialNetworkComponent } from './components/social-network/social-network.component';

// SCROLLING
import {Ng2PageScrollModule} from 'ng2-page-scroll';
import { AdminModalPaginatorComponent } from './components/admin-modal-paginator/admin-modal-paginator.component';

// IMAGES SLIDER
import { NgImageSliderModule } from 'ng-image-slider';
import { ModalComponent } from './components/modal/modal.component';
import { CloseAddWorkModalComponent } from './components/close-add-work-modal/close-add-work-modal.component';
import { AddWorkComponent } from './admin/add-work/add-work.component';
import { SliderComponent } from './components/slider/slider.component';
import { WorkOpenComponent } from './components/work-open/work-open.component';
import { EditAboutMeComponent } from './components/edit-about-me/edit-about-me.component';
import { AddSkillComponent } from './components/add-skill/add-skill.component';

import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PortfolioComponent,
    AboutComponent,
    ContactComponent,
    BlogComponent,
    AdminComponent,
    NavbarComponent,
    FooterComponent,
    SocialNetworkComponent,
    AdminModalPaginatorComponent,
    ModalComponent,
    CloseAddWorkModalComponent,
    AddWorkComponent,
    WorkOpenComponent,
    EditAboutMeComponent,
    AddSkillComponent,
    SliderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase, 'portfolio'),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    FormsModule,
    Ng2PageScrollModule, // scrolling
    NgImageSliderModule, // img
    CommonModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-left',
      maxOpened: 1,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true,
      countDuplicates: true
    }), // ToastrModule ada
    HttpClientModule // Импортируем модуль
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
