import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CenterRequestModel } from '../models/centre-request.model';
import { environment } from '../../environments/environment';
import { CenterResponseModel } from '../models/center-response.model';

@Injectable({
    providedIn: 'root'
})
export class CenterService {

    private BASE_URL = environment.apiBaseUrl + '/centers';

    constructor(private http: HttpClient) { }

    registerCenter(payload: CenterRequestModel): Observable<any> {
        return this.http.post(`${this.BASE_URL}/register`, payload);
    }

    getAllCenters() {
        return this.http.get<CenterResponseModel[]>(`${this.BASE_URL}/find-all`);
    }

}

