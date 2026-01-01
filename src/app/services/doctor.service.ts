import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor.model';
import { AddDoctorPayload } from '../models/add-doctor.payload';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private BASE_URL = environment.apiBaseUrl +'/doctors';

  constructor(private http: HttpClient) {}

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.BASE_URL}/find-all`);
  }

  addDoctor(payload: AddDoctorPayload[]): Observable<any> {
    return this.http.post(`${this.BASE_URL}/register`, payload);
  }
}
