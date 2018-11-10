import { Component, ViewChild, ChangeDetectionStrategy, Injectable, TemplateRef } from '@angular/core';
import { CityService } from './city.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalSettings, AlertType } from '../../shared/globalsettings';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import swal from 'sweetalert2';
import { SweetAlertType } from 'sweetalert2';
declare var $: any;

@Component({
  templateUrl: 'city.component.html'
})

export class CityComponent {
  modalRef: BsModalRef;
  model: any;
  modelHeaders: any = [];
  modellist: any = [];
  cityTypes: any = [];
  states: any = [];
  districts: any = [];
  talukas: any = [];
  isDetailView: boolean = false;
  deleteId: number = 0;

  constructor(
    private _service: CityService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService) {
  }

  ngOnInit() {
    this.model = {};
    this.modelHeaders = ["Sr.", "City", "City OL", "City Type", "State", "Distinct", "Taluka", "Active"];
    this.cityTypes = GlobalSettings.cityTypes;
    this.refreshDataSource();
  }

  refreshDataSource(showMessage: boolean = false, id: any = null, isDelete: boolean = false) {
    this.spinner.show();
    this.modellist = null;
    this._service.get().subscribe(item => {
      if (item.IsSuccess) {
        this.modellist = item.Result;
        GlobalSettings.ApplyDataTableStyles();
      }
      else {
        GlobalSettings.ShowMessage(GlobalSettings.TEXT_ERROR, GlobalSettings.GetErrorStringFromListOfErrors(item.ErrorMessages), AlertType.Error);
      }
      this.spinner.hide();
      if (showMessage) {
        this.modalRef.hide();
        GlobalSettings.ShowMessageFromResponse(id, isDelete);
      }
    },
      error => {
        GlobalSettings.ShowMessage(GlobalSettings.TEXT_ERROR, GlobalSettings.TEXT_ERROR_API, AlertType.Error);
        this.spinner.hide();
      });
  }

  onSaveUpdate(template: TemplateRef<any>, model: any = null, isDetailView: boolean = false) {
    this.isDetailView = isDetailView;
    if (model == null) {
      this.deleteId = 0;
      this.model = { IsActive: true };
      this.modalRef = this.modalService.show(template, GlobalSettings.defaultModalconfig);
      GlobalSettings.addDefaultModalSettings();
    }
    else {
      this.spinner.show();
      this.deleteId = model.Id;
      this._service.getById(model.Id, isDetailView).subscribe(item => {
        if (item.IsSuccess) {
          this.model = item.Result;
          this.refreshSource("CityType", false);
          this.refreshSource("State", false);
          this.refreshSource("District", false);
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

  refreshSource(sourceType: string, clearModel: boolean = true) {
    let stateId = -1;
    let cityTypeId = -1;
    switch (sourceType) {
      case "CityType":
        this.states = [];
        this.districts = [];
        this.talukas = [];
        if (clearModel) {
          this.model.StateId = null;
          this.model.DistrictId = null;
          this.model.TalukaId = null;
        }
        cityTypeId = GlobalSettings.GetCityTypeIdFromUniqueKey(GlobalSettings.stateUniqueKey);
        this.states = this.modellist.filter(function (o) { return o.CityType == cityTypeId; });
        break;
      case "State":
        this.districts = [];
        this.talukas = [];
        if (clearModel) {
          this.model.DistrictId = null;
          this.model.TalukaId = null;
        }
        stateId = this.model.StateId;
        cityTypeId = GlobalSettings.GetCityTypeIdFromUniqueKey(GlobalSettings.districtUniqueKey);
        this.districts = this.modellist.filter(function (o) { return o.CityType == cityTypeId && o.StateId == stateId; });
        break;
      case "District":
        this.talukas = [];
        if (clearModel) {
          this.model.TalukaId = null;
        }
        stateId = this.model.StateId;
        let districtId = this.model.DistrictId;
        cityTypeId = GlobalSettings.GetCityTypeIdFromUniqueKey(GlobalSettings.talukaUniqueKey);
        this.talukas = this.modellist.filter(function (o) { return o.CityType == cityTypeId && o.StateId == stateId && o.DistrictId == districtId; });
        break;
      default:
    }
  }

  onSave(model: any, IsVallid: boolean) {
    console.log("Model => " + JSON.stringify(this.model));
    if (IsVallid) {
      this.spinner.show();
      this._service.post(this.model).subscribe(item => {
        if (item.IsSuccess) {
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
