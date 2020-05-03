import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin.service';


@Component({
  selector: 'app-admin-modal-paginator',
  templateUrl: './admin-modal-paginator.component.html',
  styleUrls: ['./admin-modal-paginator.component.css']
})
export class AdminModalPaginatorComponent implements OnInit {
  constructor(
    public AdminService: AdminService
  ) { }

  ngOnInit() {
  }
  nextWork(): void {
    let paginatorCount = this.AdminService.paginatorCount;
    let paginatorIndex = this.AdminService.paginatorIndex;

    if (this.AdminService.paginatorCount === 0) {
      const index = this.AdminService.portfolioPaginator.findIndex((el, i) => {
        return this.AdminService.portfolioPaginator[i].id === this.AdminService.thisWork.id
      })
      this.AdminService.paginatorIndex.unshift(index + 1);
      this.AdminService.paginatorCount += 1;
      this.paginator();
    } else if (paginatorCount > 0) {
      const index = paginatorIndex[0];
      console.log(index + 1, 'index+1');

      paginatorIndex.unshift(index + 1);
      paginatorCount += 1;
      console.log(paginatorIndex);
      this.paginator();
    }

  }

  previousWork(): void {
    let paginatorCount = this.AdminService.paginatorCount;
    let paginatorIndex = this.AdminService.paginatorIndex;

    if (this.AdminService.paginatorCount === 0) {
      const index = this.AdminService.portfolioPaginator.findIndex((el, i) => {
        return this.AdminService.portfolioPaginator[i].id === this.AdminService.thisWork.id
      })
      this.AdminService.paginatorIndex.unshift(index - 1);
      this.AdminService.paginatorCount += 1;
      this.paginator();
    } else if (paginatorCount > 0) {
      const index = paginatorIndex[0];
      console.log(index - 1, 'index+1');

      paginatorIndex.unshift(index - 1);
      paginatorCount += 1;
      console.log(paginatorIndex);
      this.paginator();
    }
  }


  paginator(): void {
    const paginatorIndex = this.AdminService.paginatorIndex;

    this.AdminService.portfolioPaginator.forEach((el, i) => { // get info about slider

      if (paginatorIndex[0] < this.AdminService.portfolioPaginator.length && paginatorIndex[0] > 0) { // intermediate elements
        if (i === paginatorIndex[0]) {
          this.AdminService.thisWorkImgs = [];
          el.slider.forEach(item => {
            this.AdminService.thisWorkImgs.push(item);
            this.AdminService.work.unshift(el);
          })
        }
      } else if (paginatorIndex[0] < 0) { // if first element
        this.AdminService.paginatorIndex[0] = this.AdminService.portfolioPaginator.length - 1;
        if (i === paginatorIndex[0]) {
          this.AdminService.thisWorkImgs = [];
          el.slider.forEach(item => {
            this.AdminService.thisWorkImgs.push(item);
            this.AdminService.work.unshift(el);
          })
        }
      } else { // if last element
        this.AdminService.paginatorIndex[0] = 0;
        if (i === paginatorIndex[0]) {
          this.AdminService.thisWorkImgs = [];
          el.slider.forEach(item => {
            this.AdminService.thisWorkImgs.push(item);
            this.AdminService.work.unshift(el);
          })
        }
      }
    })

  }





}
