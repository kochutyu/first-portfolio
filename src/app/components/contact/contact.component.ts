import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WindowService } from 'src/app/shared/services/window.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contact_textarea: string = '';
  form: FormGroup;
  submited: boolean;

  @ViewChild('nameL', { static: false }) nameL: ElementRef;
  @ViewChild('emailL', { static: false }) emailL: ElementRef;
  @ViewChild('textL', { static: false }) textL: ElementRef;


  @ViewChild('nameS', { static: false }) nameS: ElementRef;
  @ViewChild('emailS', { static: false }) emailS: ElementRef;
  @ViewChild('textS', { static: false }) textS: ElementRef;
  constructor(
    private http: HttpClient,
    public windowS: WindowService,
    private tosterS: ToastService,
    private r: Renderer2
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      text: new FormControl(null, Validators.required),
    });
  }

  contactClear(): void{
    this.contact_textarea = '';
  }

  sendMessage(): void{
    if (this.form.invalid) {

      if (this.windowS.width > 800) { 
        this.r.addClass(this.nameL.nativeElement, 'error-border');
        this.r.addClass(this.emailL.nativeElement, 'error-border');
        this.r.addClass(this.textL.nativeElement, 'error-border');
      } else {
        this.r.addClass(this.nameS.nativeElement, 'error-border');
        this.r.addClass(this.emailS.nativeElement, 'error-border');
        this.r.addClass(this.textS.nativeElement, 'error-border');
      }


    } else {
      this.submited = true;
      const url = 'https://us-central1-portfolio-d9ab9.cloudfunctions.net/sendMail';
      this.http.post(url, null, {
        params: {
          name: this.form.value.name,
          email: this.form.value.email,
          text: this.form.value.text,
        }
      }).subscribe(res => {

        this.submited = false;
        this.form.reset();
      }, error => {
        this.submited = false;
        this.tosterS.success(`Dear ${this.form.value.name}, message sent!`, 'I will soon read the message.😎💪🏽');
        this.form.reset();
      });
    }
  }

  clearForm(): void { 
    this.form.reset();
  }

}
