import { Component, ViewChild, ChangeDetectionStrategy, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CityService } from './city.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner'; 

@Component({
  templateUrl: 'city.component.html'
})

export class CityComponent { 
  dtOptions: DataTables.Settings = {};
  citys: any = [];

  constructor(
    private _service: CityService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
  } 
   
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.refreshDataSource();
  }

  refreshDataSource() {
    this.spinner.show();
    this._service.getAllCity().subscribe(item => {
      if (item.IsSuccess) {
        this.citys = item.Result;
      }
      setTimeout(this.afterDataPopulated, 50);
      this.spinner.hide();
    });
  }

  afterDataPopulated() {
    $('#datatables').DataTable();
  } 
}
