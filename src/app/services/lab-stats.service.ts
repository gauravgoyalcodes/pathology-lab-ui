import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LabStats } from '../models/lab-stats.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LabStatsService {

  private BASE_URL = environment.apiBaseUrl + '/get-stats';

  constructor(private http: HttpClient) {}

  getLabStats(): Observable<LabStats> {
    return this.http.get<LabStats>(`${this.BASE_URL}`);
  }
}