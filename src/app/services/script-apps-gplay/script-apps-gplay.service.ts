import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from '../api-script-url.service';
import { Observable, throwError } from 'rxjs';
import { mapTo, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScriptAppsGplayService {
  url: any;
  constructor(public http: HttpClient) { this.url = api.url}

  getAppsGplayContent(keywordContent,extractsContentArray/* ,rangeQuery */): Observable<Object> {
    let config = {
      params : { extractsContent : extractsContentArray /*['herokuapp.com' ,'privacypolicy.html' ]*/ }
    }
    return this.http.get(`${this.url}apps-gplay-content/${keywordContent}`,config)/* .pipe(delay(500000)) */;
  }
  saveQueryAppsGplay(keyword,query,typeQuery) {
    let queryApps = {keyword:keyword,query:query,typeQuery:typeQuery}
    return this.http.post(`${this.url}save-apps-gplay/`,queryApps);
  }
  deleteQuery(_id) {
    return this.http.delete(`${this.url}delete-apps-gplay/${_id}`);
  }
}

