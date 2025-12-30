import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../../services/booking.service';
import { FetchBooking } from '../../../models/fetch-booking.model';

@Component({
  selector: 'app-all-bookings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './all-bookings.html',
  styleUrl: './all-bookings.css',
})
export class AllBookings implements OnInit {
  bookings: FetchBooking[] = [];
  groupedBookings: any = null;
  loading = false;
  error = '';
  info = '';

  constructor(
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef // Forces UI update
  ) { }

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings(): void {
    this.loading = true;
    this.error = '';
    this.info = '';
    this.groupedBookings = null; 

    this.bookingService.getAllBookings().subscribe({
      next: (res) => {
        this.bookings = res || [];
        if (this.bookings.length === 0) {
          this.info = 'No appointments found.';
        } else {
          this.groupBookings(this.bookings);
        }
        this.loading = false;
        this.cdr.detectChanges(); // <--- CRITICAL: Forces UI to show data immediately
      },
      error: (err) => {
        this.error = 'Sync failed. Please check server connection.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  private groupBookings(bookings: FetchBooking[]): void {
    const groups: any = {};
    bookings.forEach(b => {
      const date = b.appointmentDate;
      const slot = b.timeSlot;
      if (!groups[date]) groups[date] = {};
      if (!groups[date][slot]) groups[date][slot] = [];
      groups[date][slot].push(b);
    });
    this.groupedBookings = { ...groups };
  }

  updateStatus(id: string, status: string): void {
    const booking = this.bookings.find(b => b.bookingId === id);
    
    if (status === 'ACCEPTED' && booking) {
      const rawPhone = booking.phone ? booking.phone.replace(/\D/g, '') : '';
      if (rawPhone.length !== 10) {
        this.error = `Invalid Phone (${booking.phone}): Cannot send WhatsApp.`;
        return;
      }
    }

    this.loading = true;
    this.bookingService.updateBookingStatus(id, status).subscribe({
      next: () => this.fetchBookings(),
      error: () => {
        this.error = 'Status update failed.';
        this.loading = false;
      }
    });
  }
}