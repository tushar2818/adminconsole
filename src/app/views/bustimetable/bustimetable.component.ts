import { Component, TemplateRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalSettings, AlertType, LookupDetail, LookupType  } from '../../shared/globalsettings';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import swal from 'sweetalert2';
import { BusTimeTableService } from './bustimetable.service';
import { Subscription } from 'rxjs/Subscription';
import { AppService } from '../../app.service';
declare var $: any;

@Component({
  templateUrl: 'bustimetable.component.html'
})

export class BusTimeTableComponent {
  subscription: Subscription;  //variable to store the resource for this component in order to dispose/destroy when page unload
  modalRef: BsModalRef;
  model: any;
  modellist: any = [];
  modelHeaders: any = [];
  lookups: any = [];
  isDetailView: boolean = false;
  deleteId: number = 0;

  constructor(
    private _appservice: AppService,
    private _service: BusTimeTableService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService) {
  }

  ngOnInit() {
    this.model = {};
    this.modelHeaders = ["Sr.", "Source", "Destination", "Bus Stand", "Bus Type", "Active"];
    this.getLookups();
  }

  getLookups() {
    this.spinner.show();
    let lookupDetails: [LookupDetail, LookupDetail, LookupDetail] = [{ LookupType: LookupType.CityAll, Parameters: null },
    { LookupType: LookupType.BusStands, Parameters: null }, { LookupType: LookupType.BusTypes, Parameters: null }];

    this.subscription = this._appservice.getLookup(lookupDetails).subscribe(item => {
      if (item.IsSuccess) {
        this.lookups = item.Result;
        this.refreshDataSource();
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
        this.modalRef.hide();
        GlobalSettings.ShowMessageFromResponse(id, isDelete);
      }
    },
      error => {
        GlobalSettings.ShowMessage(GlobalSettings.TEXT_ERROR, GlobalSettings.TEXT_ERROR_API, AlertType.Error);
        this.spinner.hide();
      });
  }

  onAddUpdate(template: TemplateRef<any>, model: any = null, isDetailView: boolean = false) {
    this.isDetailView = isDetailView;
    if (model == null) {
      this.deleteId = 0;
      this.model = { IsActive: true, SourceCityId: GlobalSettings.getCity() };
      this.modalRef = this.modalService.show(template, GlobalSettings.defaultModalconfig);
      GlobalSettings.addDefaultModalSettings();
    }
    else {
      this.spinner.show();
      this.deleteId = model.Id;
      this._service.getById(model.Id, isDetailView).subscribe(item => {
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

  //standard function : to destroy the resourc, free out the memory
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  generateArray(obj) {
    return Object.keys(obj).map((key) => { return { 'Key': key, 'Value': obj[key] } });
  }

}
