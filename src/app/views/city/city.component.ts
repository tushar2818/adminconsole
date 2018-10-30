import { Component, ViewChild, ChangeDetectionStrategy, Injectable, TemplateRef  } from '@angular/core';
import { CityService } from './city.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner'; 
import { GlobalSettings, AlertType } from '../../shared/globalsettings';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

declare var $: any;

@Component({
  templateUrl: 'city.component.html'
})

export class CityComponent { 
  modalRef: BsModalRef;
  model: any;
  citys: any = []; 
  cityTypes: any = []; 

  constructor(
    private _service: CityService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
   private modalService: BsModalService) {
  } 
   
  ngOnInit() {
    this.model = {};
    this.cityTypes = GlobalSettings.cityTpes;
    this.refreshDataSource();
  } 

  refreshDataSource() {
    this.spinner.show();
    this._service.getAllCity().subscribe(item => {
      if (item.IsSuccess) {
        this.citys = item.Result;
        GlobalSettings.ApplyDataTableStyles();
      }
      else {
        GlobalSettings.ShowMessage(GlobalSettings.TEXT_ERROR, GlobalSettings.GetErrorStringFromListOfErrors(item.ErrorMessages), AlertType.Error);
      }
      this.spinner.hide();
    },
      error => {
        GlobalSettings.ShowMessage(GlobalSettings.TEXT_ERROR, GlobalSettings.TEXT_ERROR_API, AlertType.Error);
        this.spinner.hide();
      });
  } 

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, GlobalSettings.defaultModalconfig);
    GlobalSettings.addDefaultModalSettings();
  }

  onSave(model: any, IsVallid: boolean) { 
  }

}
