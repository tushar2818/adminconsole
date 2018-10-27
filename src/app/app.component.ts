import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppService } from './app.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  public citys: any = [];

  constructor(private router: Router,
    private _service: AppService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    //this.refreshDataSource();

  }

  refreshDataSource() {
    this._service.getCityForPlaceBio().subscribe(item => {
      if (item.IsSuccess) {
        this.citys = item.Result;
      }
    });
  }
}
