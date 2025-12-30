import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LabStats } from '../models/lab-stats.model';

@Injectable({
  providedIn: 'root'
})
export class LabStatsService {

  private BASE_URL = 'http://localhost:8080/pathology-lab/get-stats';

  constructor(private http: HttpClient) {}

  getLabStats(): Observable<LabStats> {
    return this.http.get<LabStats>(`${this.BASE_URL}`);
  }
}