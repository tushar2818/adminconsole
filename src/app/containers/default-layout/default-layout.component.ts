import { Component, Input } from '@angular/core';
import { navItems } from './../../_nav';
import { AppService } from '../../app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <== add the imports!
import { GlobalSettings, AlertType, LookupDetail, LookupType } from '../../shared/globalsettings';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  public citys: any = [];
  selectedCityId: number = 0;

  constructor(
    private _service: AppService,
    private spinner: NgxSpinnerService) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }

  ngOnInit() {
    this.spinner.show();
    this.refreshDataSource();
  }

  cityChanged() {
    localStorage.setItem(GlobalSettings.cityIdUniqueKey, this.selectedCityId.toString());
    window.location.reload();
  }

  refreshDataSource() {
    this._service.isLoaded = false;
    this.spinner.show();
    let lookupDetails: [LookupDetail] = [{ LookupType: LookupType.CityForPlaceBio , Parameters: null }];
    this._service.getLookup(lookupDetails).subscribe(result => {
      if (result.IsSuccess) {
        this.citys = result.Result["CityForPlaceBio"];
        let tempSelectedId = this.citys != null && this.citys.length > 0 ? this.citys[0].Key : 0;
        let existingSelectedCityId = localStorage.getItem(GlobalSettings.cityIdUniqueKey);
        if (existingSelectedCityId != null && existingSelectedCityId != "") {
          tempSelectedId = +existingSelectedCityId;
        }
        this.selectedCityId = tempSelectedId;
        localStorage.setItem(GlobalSettings.cityIdUniqueKey, this.selectedCityId.toString());
        this._service.isLoaded = true;
      }
      else {
        GlobalSettings.ShowMessage(GlobalSettings.TEXT_ERROR, GlobalSettings.GetErrorStringFromListOfErrors(result.ErrorMessages), AlertType.Error);
      }
      this.spinner.hide();
    },
      error => {
        GlobalSettings.ShowMessage(GlobalSettings.TEXT_ERROR, GlobalSettings.TEXT_ERROR_API, AlertType.Error);
        this.spinner.hide();
      });
  }
}
