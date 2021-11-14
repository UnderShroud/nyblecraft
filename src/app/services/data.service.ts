import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _serverUrl = 'http://localhost:3000/notes'

  constructor(private _http: HttpClient) { }

  getData(): Observable<any> {
    return this._http.get(this._serverUrl)
  }

  postData(data: any): Observable<any> {
    return this._http.post(this._serverUrl, data)
  }
}
