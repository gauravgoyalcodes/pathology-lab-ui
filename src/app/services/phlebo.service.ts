import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PhleboRequestModel } from '../models/phlebo-reqeust.model';
import { environment } from '../../environments/environment';
import { PhleboResponseModel } from '../models/phlebo-response.model';

@Injectable({
    providedIn: 'root'
})
export class PhleboService {

    private BASE_URL = environment.apiBaseUrl + '/phlebos';

    constructor(private http: HttpClient) { }

    registerPhlebo(payload: PhleboRequestModel[]): Observable<any> {
        return this.http.post(`${this.BASE_URL}/add`, payload);
    }

    getPhlebos(): Observable<PhleboResponseModel[]> {
        return this.http.get<PhleboResponseModel[]>(`${this.BASE_URL}/find-all`);
      }
}