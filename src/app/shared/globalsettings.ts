import swal from 'sweetalert2';
import { SweetAlertType } from 'sweetalert2';
import { Headers } from '@angular/http';

declare var $: any;

export class GlobalSettings {
  //api details
  public static BASE_API_ENDPOINT_CITY = 'http://localhost:31497/api/';
  public static getHeaderStringCity(): Headers {
    let headerStringCity = {
      'Content-Type': 'application/json',
      'ApplicationId': GlobalSettings.getCity(),
      'ApplicationToken': "2"
    };
    return new Headers(headerStringCity);
  };
  public static BASE_API_ENDPOINT_IDENTITY = 'http://localhost:31713/api/';
  public static getHeaderStringIDENTITY(): Headers {
    let headerStringCity = {
      'Content-Type': 'application/json',
      'ApplicationId': GlobalSettings.getCity(),
      'ApplicationToken': "2"
    };
    return new Headers(headerStringCity);
  };

  public static getCity(): number {
    var existingCity = localStorage.getItem("CityId");
    if (existingCity != null) {
      return +existingCity.toString();
    }
    else {
      return 0;
    }
  }
 
  //city unique keys
  static stateUniqueKey = "State";
  static districtUniqueKey = "District";
  static talukaUniqueKey = "Taluka";
  static villageUniqueKey = "Village";
  static areaUniqueKey = "Area";
  static cityIdUniqueKey = "CityId";

  static cityTypes = [{ Id: 1, Type: 'State', cityType: GlobalSettings.stateUniqueKey }, { Id: 2, Type: 'District', cityType: GlobalSettings.districtUniqueKey }, { Id: 3, Type: 'Taluka', cityType: GlobalSettings.talukaUniqueKey }, { Id: 4, Type: 'Village', cityType: GlobalSettings.villageUniqueKey }, { Id: 5, Type: 'Area', cityType: GlobalSettings.areaUniqueKey }];
  static GetCityTypeIdFromUniqueKey(uniqueKey: string): number {
    let type = GlobalSettings.cityTypes.filter(function (o) { return o.cityType == uniqueKey; })[0];
    if (type != null)
      return type.Id;
    return -1;
  }

  //modal settings
  static addDefaultModalSettings() {
    $('.modal-dialog').addClass('modal-lg');
    $('.modal-dialog').addClass('modal-primary');
  }

  static defaultModalconfig = {
    //backdrop: false,
    ignoreBackdropClick: true,
    keyboard: false
  };

  //common titles
  static TEXT_ERROR = "Error";
  static TEXT_SAVED_TITLE = "Saved";
  static TEXT_SAVED_MESSAGE = "Record Saved Successfully";
  static TEXT_UPDATED_TITLE = "Updated";
  static TEXT_UPDATED_MESSAGE = "Record Updated Successfully";
  static TEXT_DELETED_TITLE = "Deleted";
  static TEXT_DELETED_MESSAGE = "Record Deleted Successfully";
  static TEXT_ERROR_API = "Api Not Available";
  static TEXT_CONFIRM_TITLE = "Are you sure?";
  static TEXT_CONFIRM_MESSAGE = "You won't be able to revert this!";
  static TEXT_CONFIRM_DELETE = "Yes, delete it!";

  //common methods
  static ApplyDataTableStyles(datatableId: string = 'datatables') {
    setTimeout(GlobalSettings.AfterDataPopulated, 50, datatableId);
  }

  static AfterDataPopulated(datatableId: string) {
    $('#' + datatableId).DataTable();
  }

  static ShowMessage(title: string, message: string, alertType: AlertType = AlertType.Success) {
    let icon = alertType == AlertType.Success ? 'success' : alertType == AlertType.Error ? 'error' : 'warning';
    swal(
      title,
      message, icon as SweetAlertType
    );
  }

  static ShowMessageFromResponse(primaryKey: any, isDelete: boolean = false) {
    let title = GlobalSettings.TEXT_SAVED_TITLE;
    let message = GlobalSettings.TEXT_SAVED_MESSAGE;
    if (primaryKey != null && primaryKey != "0") {
      title = GlobalSettings.TEXT_UPDATED_TITLE;
      message = GlobalSettings.TEXT_UPDATED_MESSAGE;
    }
    if (isDelete) {
      title = GlobalSettings.TEXT_DELETED_TITLE;
      message = GlobalSettings.TEXT_DELETED_MESSAGE;
    }
    GlobalSettings.ShowMessage(title, message, AlertType.Success);
  }
  
  static GetErrorStringFromListOfErrors(ErrorMessages: any) {
    if (ErrorMessages == null)
      return "";
    let errors = ErrorMessages.map(data => data.Message);
    return errors.toString();
  }
} 

export enum AlertType {
  Success,
  Error,
  Warning,
  Info,
  Question
}

export enum LookupType {
  CityForPlaceBio,
  CityAll,
  BusTypes,
  BusStands
}

export enum LookupParameter {
}

export class LookupDetail {
  public LookupType: LookupType;
  public Parameters: any;
}
