import { Component, ViewChild, ChangeDetectionStrategy, Injectable, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalSettings, AlertType } from '../../shared/globalsettings';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import swal from 'sweetalert2';
import { SweetAlertType } from 'sweetalert2';
import { BusTypeService } from './bustype.service';
declare var $: any;
@Component({
  templateUrl: 'bustype.component.html'
})

export class BusTypeComponent {
  modalRef: BsModalRef;
  model: any;
  modellist: any = [];
  modelHeaders: any = [];

  constructor(
    private _service: BusTypeService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService) {
  }

  ngOnInit() {
    this.model = {};
    this.modelHeaders = ["Sr.", "Bus Type", "Bus Type OL", "Created Date", "Updated Date", "Active"];
    this.refreshDataSource();
  }

  refreshDataSource(showMessage: boolean = false, id: any = null, isDelete: boolean = false) {
    this.spinner.show();
    this.modellist = null;
    this._service.getall().subscribe(item => {
      if (item.IsSuccess) {
        this.modellist = item.Result;
        GlobalSettings.ApplyDataTableStyles();
      }
      else {
        GlobalSettings.ShowMessage(GlobalSettings.TEXT_ERROR, GlobalSettings.GetErrorStringFromListOfErrors(item.ErrorMessages), AlertType.Error);
      }
      this.spinner.hide();
      if (showMessage) {
        GlobalSettings.ShowMessageFromResponse(id, isDelete);
      }
    },
      error => {
        GlobalSettings.ShowMessage(GlobalSettings.TEXT_ERROR, GlobalSettings.TEXT_ERROR_API, AlertType.Error);
        this.spinner.hide();
      });
  }

  onAddUpdate(template: TemplateRef<any>, model: any = null) {
    if (model == null) {
      this.model = { IsActive: true };
      this.modalRef = this.modalService.show(template, GlobalSettings.defaultModalconfig);
      GlobalSettings.addDefaultModalSettings();
    }
    else {
      this.spinner.show();
      this._service.getById(model.Id).subscribe(item => {
        if (item.IsSuccess) {
          this.model = item.Result;
          this.modalRef = this.modalService.show(template, GlobalSettings.defaultModalconfig);
          GlobalSettings.addDefaultModalSettings();
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
  }
   
  onSave(model: any, IsVallid: boolean) {
    console.log("Model => " + JSON.stringify(this.model));
    if (IsVallid) {
      this.spinner.show();
      this._service.post(this.model).subscribe(item => {
        if (item.IsSuccess) {
          this.modalRef.hide();
          this.refreshDataSource(true, this.model.Id);
        }
        else {
          GlobalSettings.ShowMessage(GlobalSettings.TEXT_ERROR, GlobalSettings.GetErrorStringFromListOfErrors(item.ErrorMessages), AlertType.Error);
          this.spinner.hide();
        }
      },
        error => {
          GlobalSettings.ShowMessage(GlobalSettings.TEXT_ERROR, GlobalSettings.TEXT_ERROR_API, AlertType.Error);
          this.spinner.hide();
        });
    }
  }

  onDelete(Id: any) {
    swal({
      title: GlobalSettings.TEXT_CONFIRM_TITLE,
      text: GlobalSettings.TEXT_CONFIRM_MESSAGE,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: GlobalSettings.TEXT_CONFIRM_DELETE
    }).then((result) => {
      if (result.value) {
        this.perFormDelete(Id);
      }
    }, function (dismiss) { });
  }

  perFormDelete(Id: any) {
    this.spinner.show();
    this._service.delete(Id).subscribe(item => {
      if (item.IsSuccess) {
        this.refreshDataSource(true, Id, true);
      }
      else {
        GlobalSettings.ShowMessage(GlobalSettings.TEXT_ERROR, GlobalSettings.GetErrorStringFromListOfErrors(item.ErrorMessages), AlertType.Error);
        this.spinner.hide();
      }
    },
      error => {
        GlobalSettings.ShowMessage(GlobalSettings.TEXT_ERROR, GlobalSettings.TEXT_ERROR_API, AlertType.Error);
        this.spinner.hide();
      });
  }

  generateArray(obj) {
    return Object.keys(obj).map((key) => { return { 'Key': key, 'Value': obj[key] } });
  }

}
