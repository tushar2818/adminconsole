import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { GlobalSettings } from '../../shared/globalsettings';

@Injectable()
export class RolesService {
  constructor(private _http: Http) { }
  private RegenerateData = new Subject<number>();
  public componentUrl = GlobalSettings.BASE_API_ENDPOINT_IDENTITY + "roles/";
  RegenerateData$ = this.RegenerateData.asObservable(); 

  getall(): Observable<any> {
    let options = new RequestOptions({ headers: GlobalSettings.getHeaderStringIDENTITY() });
    let url = this.componentUrl + "getall";
    return this._http.get(url, options)
      .map((response: Response) => <any>response.json())
      .do(data => { })
      .catch(this.handleErrorPromise);
  }

  getById(Id): Observable<any> {
    let options = new RequestOptions({ headers: GlobalSettings.getHeaderStringIDENTITY() });
    let url = this.componentUrl + "getbyid/" + Id;
    return this._http.get(url, options)
      .map((response: Response) => <any>response.json())
      .do(data => { })
      .catch(this.handleErrorPromise);
  }

  post(model): Observable<any> {
    let options = new RequestOptions({ headers: GlobalSettings.getHeaderStringIDENTITY() });
    let url = this.componentUrl + "saveupdate";
    let postBody = JSON.stringify(model);
    return this._http.post(url, postBody, options)
      .map((response: Response) => <any>response.json())
      .do(data => { })
      .catch(this.handleErrorPromise);
  }

  delete(id): Observable<any> {
    let options = new RequestOptions({ headers: GlobalSettings.getHeaderStringIDENTITY() });
    let url = this.componentUrl + id;
    return this._http.delete(url, options)
      .map((response: Response) => <any>response.json())
      .do(data => { })
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

    console.log(errMsg);
    return Promise.reject(errMsg);
  }
}
