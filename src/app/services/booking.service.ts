import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookingRequest } from '../models/booking.model';
import { FetchBooking } from '../models/fetch-booking.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private BASE_URL = environment.apiBaseUrl

  constructor(private http: HttpClient) { }

  createBooking(payload: BookingRequest): Observable<any> {
    return this.http.post(`${this.BASE_URL}/register`, payload);
  }

  getAllBookings() {
    return this.http.get<FetchBooking[]>(`${this.BASE_URL}/find-all/bookings`);
  }

  updateBookingStatus(bookingId: string, status: string): Observable<any> {
    const url = `${this.BASE_URL}/update-status/${bookingId}/${status}`;
    return this.http.patch(url, {});
  }

}
