import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { GlobalSettings, LookupDetail, LookupType } from './shared/globalsettings';
import { EventEmitter } from 'events';

@Injectable()
export class AppService {
  loadCompleted: EventEmitter = new EventEmitter();
  isLoaded: boolean = false;
  private RegenerateData = new Subject<number>();
  RegenerateData$ = this.RegenerateData.asObservable();
  public componentUrl = GlobalSettings.BASE_API_ENDPOINT_CITY + "lookup/";

  constructor(private _http: Http) { } 

  getLookup(lookupDetails: any): Observable<any> {
    let options = new RequestOptions({ headers: GlobalSettings.getHeaderStringCity() });
    let url = this.componentUrl + "getall";
    let body = JSON.stringify(lookupDetails);
    return this._http.post(url, body, options)
      .map((response: Response) => <any>response.json())
      .do(data => {  })
      .catch(this.handleErrorPromise);
  }

  protected handleErrorPromise(error: any): Promise<void> {
    try {
      error = JSON.parse(error._body);
    } catch (e) {
    }

    let errMsg = error.errorMessage
      ? error.errorMessage
      : error.message
        ? error.message
        : error._body
          ? error._body
          : error.status
            ? `${error.status} - ${error.statusText}`
            : 'Errorr';
    return Promise.reject(errMsg);
  }
}
