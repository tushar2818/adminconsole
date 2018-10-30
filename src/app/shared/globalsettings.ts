import swal from 'sweetalert2';
import { SweetAlertType } from 'sweetalert2';
declare var $: any;

export class GlobalSettings {
  public static BASE_API_ENDPOINT_CITY = 'http://localhost:31497/api/'; 
 
  public static HeaderStringCity = {
    'Content-Type': 'application/json',
    'ApplicationId': GlobalSettings.getCity(),
    'ApplicationToken': "2"
  };
  public static getCity(): string {
    var existingCity = localStorage.getItem('CityId');
    if (existingCity != null) {
      return existingCity.toString();
    }
    else {
      return "";
    }
  }

  static cityTpes = [{ Id: 1, Type: 'State' }, { Id: 2, Type: 'District' }, { Id: 3, Type: 'Taluka' }, { Id: 4, Type: 'Village' }, { Id: 5, Type: 'Area' }];

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
  static TEXT_SAVED = "Saved";
  static TEXT_UPDATED = "Updated";
  static TEXT_DELETED = "Deleted";
  static TEXT_ERROR_API = "Api Not Available";

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
