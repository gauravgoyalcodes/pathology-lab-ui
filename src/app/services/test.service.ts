import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Test } from '../models/test.model';
import { AddTestPayload } from '../models/add-test.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private BASE_URL = environment.apiBaseUrl +'/tests';

  constructor(private http: HttpClient) {}

  getTests(): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.BASE_URL}/find-all`);
  }

  addTest(payload: AddTestPayload[]): Observable<any> {
      return this.http.post(`${this.BASE_URL}/register`, payload);
  }

}


