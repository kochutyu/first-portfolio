import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toast: ToastrService
  ) { }

  error(header?: string, describe?: string) {
    this.toast.error(`${describe}`, `${header}`);
  }

  info(header?: string, describe?: string) {
    this.toast.info(`${describe}`, `${header}`);
  }

  success(header?: string, describe?: string) {
    this.toast.success(`${describe}`, `${header}`);
  }

  warning(header?: string, describe?: string) {
    this.toast.warning(`${describe}`, `${header}`);
  }

}
