import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { GlobalSettings } from '../../shared/globalsettings';
declare var swal: any;

@Injectable()
export class TestService {
    constructor(private _http: Http) { }
    private RegenerateData = new Subject<number>();
    // Observable string streams
    RegenerateData$ = this.RegenerateData.asObservable();
  public componentUrl = "cityforplacebio"
    getHeader(): Headers {
      return new Headers(GlobalSettings.HeaderStringCity);
    }

  get(): Observable<any> {
    let options = new RequestOptions({ headers: this.getHeader() });
    let url = GlobalSettings.BASE_API_ENDPOINT_CITY + this.componentUrl;
    return this._http.get(url, options)
      .map((response: Response) => <any>response.json())
      .do(data => console.log("url => " + JSON.stringify(data)))
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
