import { Component, Input } from '@angular/core';
import { navItems } from './../../_nav';
import { AppService } from '../../app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <== add the imports!
import { GlobalSettings, AlertType } from '../../shared/globalsettings';

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
    localStorage.setItem("CityId", this.selectedCityId.toString());
    window.location.reload();
  }

  refreshDataSource() {
    this.spinner.show();
    this._service.getCityForPlaceBio().subscribe(result => {
      if (result.IsSuccess) {
        this.citys = result.Result;
        let tempSelectedId = this.citys[0].Id;
        let existingSelectedCityId = localStorage.getItem('CityId');
        if (existingSelectedCityId != null && existingSelectedCityId != "") {
          tempSelectedId = +existingSelectedCityId;
        }
        this.selectedCityId = tempSelectedId;
        localStorage.setItem("CityId", this.selectedCityId.toString());
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
